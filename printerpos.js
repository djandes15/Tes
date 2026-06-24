// =============================================================================
// DJANDES - Thermal Printer Module (UPDATED WITH PAYMENT METHODS)
// Mendukung:
//   1. Web Bluetooth API (butuh HTTPS + Chrome/Edge)
//   2. Fallback window.print() 58mm (bekerja di lokal file://)
// =============================================================================

(function () {
    // ---- State ----
    let _printerDevice = null;
    let _printerCharacteristic = null;
    let _connected = false;

    // UUID umum printer thermal BLE (Xprinter, GOOJPRT, Rongta, dll.)
    const PRINTER_SERVICE_UUIDS = [
        '000018f0-0000-1000-8000-00805f9b34fb', // Standard SPP BLE
        '49535343-fe7d-4ae5-8fa9-9fafd205e455', // Microchip
        'e7810a71-73ae-499d-8c15-faa9aef0c3f2', // Xprinter/GOOJPRT
        '0000ff00-0000-1000-8000-00805f9b34fb', // Generic
        '0000ffe0-0000-1000-8000-00805f9b34fb', // HM-11 BLE Module
    ];

    const PRINTER_CHAR_UUIDS = [
        '00002af1-0000-1000-8000-00805f9b34fb',
        '49535343-8841-43f4-a8d4-ecbe34729bb3',
        'bef8d6c9-9c21-4c9e-b632-bd58c1009f9f',
        '0000ff02-0000-1000-8000-00805f9b34fb',
        '0000ffe1-0000-1000-8000-00805f9b34fb',
    ];

    // ESC/POS Constants
    const ESC = 0x1B;
    const GS = 0x1D;
    const LF = 0x0A;

    // ---- Cek ketersediaan Web Bluetooth ----
    function isBluetoothAvailable() {
        return !!(navigator.bluetooth);
    }

    // ---- Update tampilan status printer di UI ----
    function updatePrinterStatusUI() {
        const statusDot = document.getElementById('printer-status-dot');
        const statusText = document.getElementById('printer-status-text');
        const connectBtn = document.getElementById('connect-printer-btn');

        if (!statusDot || !statusText || !connectBtn) return;

        if (_connected) {
            statusDot.className = 'printer-dot connected';
            statusText.textContent = 'Printer: Terhubung ✓';
            connectBtn.textContent = 'Putuskan';
            connectBtn.className = 'printer-connect-btn disconnecting';
        } else {
            statusDot.className = 'printer-dot disconnected';
            statusText.textContent = isBluetoothAvailable()
                ? 'Printer: Belum terhubung'
                : 'Bluetooth tidak tersedia (butuh HTTPS)';
            connectBtn.textContent = 'Hubungkan Printer';
            connectBtn.className = 'printer-connect-btn';
        }
    }

    // ---- Koneksi ke Printer Bluetooth ----
    async function connectPrinter() {
        if (_connected) {
            disconnectPrinter();
            return;
        }

        if (!isBluetoothAvailable()) {
            showPrinterNotification(
                'Web Bluetooth tidak tersedia.\n' +
                'Pastikan:\n' +
                '• Menggunakan Chrome atau Edge\n' +
                '• Halaman diakses via HTTPS (bukan file://)\n\n' +
                'Untuk saat ini gunakan tombol "Cetak via Browser".',
                'warning'
            );
            return;
        }

        try {
            showPrinterNotification('Mencari printer Bluetooth...', 'info');

            _printerDevice = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: PRINTER_SERVICE_UUIDS
            });

            _printerDevice.addEventListener('gattserverdisconnected', onPrinterDisconnected);

            const server = await _printerDevice.gatt.connect();
            showPrinterNotification('Terhubung ke GATT server...', 'info');

            let service = null;
            for (const uuid of PRINTER_SERVICE_UUIDS) {
                try {
                    service = await server.getPrimaryService(uuid);
                    if (service) break;
                } catch (_) { }
            }

            if (!service) {
                throw new Error('Tidak menemukan service printer yang kompatibel.');
            }

            let characteristic = null;
            for (const uuid of PRINTER_CHAR_UUIDS) {
                try {
                    characteristic = await service.getCharacteristic(uuid);
                    if (characteristic) break;
                } catch (_) { }
            }

            if (!characteristic) {
                const characteristics = await service.getCharacteristics();
                characteristic = characteristics.find(c =>
                    c.properties.write || c.properties.writeWithoutResponse
                );
            }

            if (!characteristic) {
                throw new Error('Tidak menemukan characteristic yang bisa ditulis pada printer ini.');
            }

            _printerCharacteristic = characteristic;
            _connected = true;
            updatePrinterStatusUI();
            showPrinterNotification(`✓ Printer "${_printerDevice.name || 'Thermal Printer'}" terhubung!`, 'success');

        } catch (err) {
            _connected = false;
            _printerCharacteristic = null;
            updatePrinterStatusUI();
            if (err.name !== 'NotFoundError') {
                showPrinterNotification('Gagal koneksi: ' + err.message, 'error');
            }
        }
    }

    // ---- Putuskan koneksi ----
    function disconnectPrinter() {
        if (_printerDevice && _printerDevice.gatt.connected) {
            _printerDevice.gatt.disconnect();
        }
        onPrinterDisconnected();
    }

    function onPrinterDisconnected() {
        _connected = false;
        _printerCharacteristic = null;
        updatePrinterStatusUI();
        showPrinterNotification('Printer terputus.', 'info');
    }

    // ---- Build ESC/POS byte array ----
    function buildEscPos(customerName, pickupDate, pickupTime) {
        // Ambil data dari appData global
        const cartData = window.appData ? window.appData.cart : {};
        const cartInfoData = window.appData ? window.appData.cartInfo : {};
        const products = window.appData ? window.appData.products : [];
        const siteName = window.appData ? window.appData.siteSettings.title : 'DJANDES';
        const address = window.appData ? window.appData.siteSettings.description : '';

        // Ambil Data Finansial & Metode Pembayaran Baru dari UI
        const paymentStatus = document.getElementById('payment-status')?.value || 'Lunas';
        const amountPaid = parseFloat(document.getElementById('amount-paid')?.value) || 0;

        const bytes = [];
        const push = (arr) => arr.forEach(b => bytes.push(b));
        const txt = (str) => {
            const clean = str
                .replace(/Rp\s/g, 'Rp ')
                .replace(/[^\x00-\x7E]/g, (c) => {
                    const map = {
                        'á': 'a', 'à': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a',
                        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
                        'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
                        'ó': 'o', 'ò': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
                        'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
                        'ñ': 'n', 'ç': 'c'
                    };
                    return map[c] || '?';
                });
            for (let i = 0; i < clean.length; i++) {
                bytes.push(clean.charCodeAt(i) & 0xFF);
            }
        };
        const nl = () => bytes.push(LF);
        const line = (str) => { txt(str); nl(); };
        const divider = (char = '-', len = 32) => line(char.repeat(len));

        const dateFormatted = pickupDate
            ? new Date(pickupDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
            : pickupDate;

        const rupiah = (num) => 'Rp ' + Number(num).toLocaleString('id-ID');

        // Initialize Printer
        push([ESC, 0x40]);
        push([ESC, 0x74, 0x00]); // PC437

        // ---- HEADER ----
        push([ESC, 0x61, 0x01]); // Center
        push([ESC, 0x45, 0x01]); // Bold ON
        push([GS, 0x21, 0x11]);    // Double size
        line(siteName.toUpperCase());
        push([GS, 0x21, 0x00]);    // Normal size
        push([ESC, 0x45, 0x00]); // Bold OFF
        line('Sweet & Savoury');
        if (address) {
            let addressLines = wordWrap(address, 32);
            addressLines.forEach(addrLine => { line(addrLine); });    
        }
        line('+62-858-1200-6225');

        push([ESC, 0x61, 0x00]); // Left align
        divider('=', 32);

        // ---- NOTA METADATA ----
        const now = new Date();
        const curDate = now.toLocaleDateString('id-ID', {day:'2-digit', month:'2-digit', year:'2-digit'});
        line('Jam    : ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
        line('Cust   : ' + customerName.toUpperCase());
        line('Tgl    : ' + dateFormatted);
        divider('-', 32);

        // ---- ITEMS ----
        let totalPrice = 0;
        Object.keys(cartData).forEach(key => {
            const qty = cartData[key];
            if (!qty || qty <= 0) return;

            let product, boxOptionPrice = 0;
            if (cartInfoData && cartInfoData[key]) {
                const info = cartInfoData[key];
                product = products.find(p => p.id === info.productId);
                boxOptionPrice = info.boxOptionPrice || 0;
            } else {
                product = products.find(p => p.id == key);
            }

            if (!product) return;

            const unitPrice = product.price + boxOptionPrice;
            const itemTotal = unitPrice * qty;
            totalPrice += itemTotal;

            line(product.name.toUpperCase().substring(0, 32));
            const qtyStr = `  ${qty} x ${rupiah(unitPrice)}`;
            const totalStr = rupiah(itemTotal);
            const spacer = 32 - qtyStr.length - totalStr.length;
            line(qtyStr + ' '.repeat(Math.max(0, spacer)) + totalStr);
        });

        divider('=', 32);

        // ---- TOTAL TAGIHAN ----
        push([ESC, 0x61, 0x02]); // Right align
        push([ESC, 0x45, 0x01]); // Bold ON
        line('TOTAL: ' + rupiah(totalPrice));
        push([ESC, 0x45, 0x00]); // Bold OFF

        // Perhitungan Finansial Kembalian / Sisa Piutang
        let debt = 0;
        let change = 0;
        if (paymentStatus === "Lunas" || paymentStatus === "Transfer") {
            if (amountPaid >= totalPrice) change = amountPaid - totalPrice;
            else debt = totalPrice - amountPaid;
        } else {
            if (amountPaid < totalPrice) debt = totalPrice - amountPaid;
            else change = amountPaid - totalPrice;
        }

        // ---- FITUR BARU: CETAK METODE PEMBAYARAN ----
        const statusLine = `Status : ${paymentStatus.toUpperCase()}`;
        line(' '.repeat(Math.max(0, 32 - statusLine.length)) + statusLine);
        
        const payLine = `Bayar  : ${rupiah(amountPaid)}`;
        line(' '.repeat(Math.max(0, 32 - payLine.length)) + payLine);

        if (debt > 0) {
            const debtLine = `Kurang : ${rupiah(debt)}`;
            line(' '.repeat(Math.max(0, 32 - debtLine.length)) + debtLine);
        }
        if (change > 0) {
            const changeLine = `Kembali: ${rupiah(change)}`;
            line(' '.repeat(Math.max(0, 32 - changeLine.length)) + changeLine);
        }

        // ---- FOOTER ----
        push([ESC, 0x61, 0x01]); // Center
        divider('-', 32);
        line('Terima kasih atas pesanan Anda!');
        line('Silakan hubungi kami jika ada');
        line('pertanyaan lebih lanjut.');

        // Feed & Cut
        push([GS, 0x56, 0x41, 0x03]);
        return new Uint8Array(bytes);
    }

    // ---- Kirim data ke printer via chunk ----
    async function sendToPrinter(data) {
        const CHUNK_SIZE = 200;
        for (let i = 0; i < data.length; i += CHUNK_SIZE) {
            const chunk = data.slice(i, i + CHUNK_SIZE);
            if (_printerCharacteristic.properties.writeWithoutResponse) {
                await _printerCharacteristic.writeValueWithoutResponse(chunk);
            } else {
                await _printerCharacteristic.writeValue(chunk);
            }
            await new Promise(r => setTimeout(r, 50));
        }
    }

    // ---- MAIN: Cetak Struk ----
    async function printStruk() {
        const customerName = document.getElementById('customer-name')?.value?.trim();
        const pickupDate = document.getElementById('pickup-date')?.value;
        const pickupTime = document.getElementById('pickup-time')?.value;

        if (!customerName || !pickupDate || !pickupTime) {
            showPrinterNotification('Harap lengkapi Data Pengambilan!', 'warning');
            return;
        }

        const cartData = window.appData ? window.appData.cart : {};
        const hasItems = Object.values(cartData).some(qty => qty > 0);
        if (!hasItems) {
            showPrinterNotification('Keranjang belanja kosong!', 'warning');
            return;
        }

        if (_connected && _printerCharacteristic) {
            try {
                showPrinterNotification('Mengirim data ke printer...', 'info');
                const data = buildEscPos(customerName, pickupDate, pickupTime);
                await sendToPrinter(data);
                showPrinterNotification('✓ Struk berhasil dicetak!', 'success');
            } catch (err) {
                _connected = false;
                _printerCharacteristic = null;
                updatePrinterStatusUI();
                showPrinterNotification('Gagal cetak Bluetooth: ' + err.message, 'error');
            }
        } else {
            printStrukFallback(customerName, pickupDate, pickupTime);
        }
    }

    // ---- Fallback: Cetak via window.print() dengan tambahan Metode Pembayaran ----
    function printStrukFallback(customerName, pickupDate, pickupTime) {
        const cartData = window.appData ? window.appData.cart : {};
        const cartInfoData = window.appData ? window.appData.cartInfo : {};
        const products = window.appData ? window.appData.products : [];
        const siteName = window.appData ? window.appData.siteSettings.title : 'DJANDES';
        const address = window.appData ? window.appData.siteSettings.description : '';

        const paymentStatus = document.getElementById('payment-status')?.value || 'Lunas';
        const amountPaid = parseFloat(document.getElementById('amount-paid')?.value) || 0;

        const rupiah = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');
        const dateFormatted = pickupDate
            ? new Date(pickupDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
            : pickupDate;
        const now = new Date();

        let itemsHtml = '';
        let totalPrice = 0;

        Object.keys(cartData).forEach(key => {
            const qty = cartData[key];
            if (!qty || qty <= 0) return;

            let product, boxOptionPrice = 0;
            if (cartInfoData && cartInfoData[key]) {
                const info = cartInfoData[key];
                product = products.find(p => p.id === info.productId);
                boxOptionPrice = info.boxOptionPrice || 0;
            } else {
                product = products.find(p => p.id == key);
            }
            if (!product) return;

            const unitPrice = product.price + boxOptionPrice;
            const itemTotal = unitPrice * qty;
            totalPrice += itemTotal;

            itemsHtml += `
                <tr><td colspan="2"><b>${product.name.toUpperCase()}</b></td></tr>
                <tr>
                    <td>${qty} x ${rupiah(unitPrice)}</td>
                    <td style="text-align:right"><b>${rupiah(itemTotal)}</b></td>
                </tr>
            `;
        });

        let debt = 0;
        let change = 0;
        if (paymentStatus === "Lunas" || paymentStatus === "Transfer") {
            if (amountPaid >= totalPrice) change = amountPaid - totalPrice;
            else debt = totalPrice - amountPaid;
        } else {
            if (amountPaid < totalPrice) debt = totalPrice - amountPaid;
            else change = amountPaid - totalPrice;
        }

        const printHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Struk - ${siteName}</title>
    <style>
        @page { size: 58mm auto; margin: 2mm; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Courier New', Courier, monospace; font-size: 11px; width: 54mm; color: #000; }
        .center { text-align: center; }
        .right   { text-align: right; }
        .bold    { font-weight: bold; }
        .big     { font-size: 14px; font-weight: bold; }
        .divider-solid  { border-top: 1px solid #000; margin: 4px 0; }
        .divider-dashed { border-top: 1px dashed #000; margin: 4px 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 1px 0; vertical-align: top; }
        .total-row td { font-size: 12px; font-weight: bold; padding-top: 2px; }
    </style>
</head>
<body>
    <div class="center big">${siteName.toUpperCase()}</div>
    <div class="center">Sweet &amp; Savoury</div>
    ${address ? `<div class="center" style="font-size:10px">${address}</div>` : ''}
    <div class="center">+62-858-1200-6225</div>
    <div class="divider-solid"></div>

    <table>
        <tr><td>Jam</td><td>: ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} (${now.toLocaleDateString('id-ID', {day:'2-digit', month:'2-digit'})})</td></tr>
        <tr><td>Cust</td><td>: ${customerName.toUpperCase()}</td></tr>
        <tr><td>Tgl</td><td>: ${dateFormatted} (${pickupTime})</td></tr>
    </table>

    <div class="divider-dashed"></div>
    <table>${itemsHtml}</table>
    <div class="divider-solid"></div>

    <table>
        <tr class="total-row"><td>TOTAL</td><td class="right">${rupiah(totalPrice)}</td></tr>
        <tr><td>Status</td><td class="right"><b>${paymentStatus.toUpperCase()}</b></td></tr>
        <tr><td>Bayar</td><td class="right">${rupiah(amountPaid)}</td></tr>
        ${debt > 0 ? `<tr><td>Kurang</td><td class="right" style="color:red">${rupiah(debt)}</td></tr>` : ''}
        ${change > 0 ? `<tr><td>Kembali</td><td class="right">${rupiah(change)}</td></tr>` : ''}
    </table>

    <div class="divider-dashed"></div>
    <div class="center" style="font-size: 10px; margin-top: 6px;">
        Terima kasih atas pesanan Anda!<br>Hubungi kami jika ada pertanyaan.
    </div>
    <script>
        window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
        };
    <\/script>
</body>
</html>`;

        const pw = window.open('', '_blank', 'width=300,height=600');
        if (pw) {
            pw.document.write(printHtml);
            pw.document.close();
        } else {
            showPrinterNotification('Popup diblokir browser. Izinkan akses popup!', 'error');
        }
    }

    function showPrinterNotification(message, type) {
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
        } else {
            console.log('[Printer]', type.toUpperCase(), message);
        }
    }

    // ---- Expose ke global ----
    window.DjandesPrinter = {
        connect: connectPrinter,
        disconnect: disconnectPrinter,
        print: printStruk,
        printFallback: printStrukFallback,
        isConnected: () => _connected,
        isBluetoothAvailable,
        updateUI: updatePrinterStatusUI,
    };

    function wordWrap(text, maxLength) {
        if (!text || text.length <= maxLength) return [text];
        let words = text.split(' ');
        let lines = [];
        let currentLine = '';
        for (let word of words) {
            if (currentLine.length + word.length + (currentLine.length > 0 ? 1 : 0) <= maxLength) {
                currentLine += (currentLine.length > 0 ? ' ' : '') + word;
            } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
            }
        }
        if (currentLine) lines.push(currentLine);
        return lines;
    }
})();