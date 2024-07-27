document.getElementById('myForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const getValue = (id) => {
        const element = document.getElementById(id);
        if (!element) {
            console.log(`Element with ID ${id} not found`);
        }
        return element ? element.value : '';
    };

    console.log('Checking if element with ID sheet exists: ', document.getElementById('sheet'));

    const sheet = getValue('sheet');
    const name = getValue('name');
    const tanggal = getValue('tanggal');
    const alamatTujuan = getValue('alamat-tujuan');
    const alamatJemput = getValue('alamat-jemput');
    const tipe = getValue('tipedata');
    const data = getValue('tampung');
    const agen = getValue('agen');
    const tiket = getValue('tiket');
    const st = getValue('st');
    const fee = getValue('fee');
    const waPesan = getValue('wa-pesan');
    const driver1 = getValue('driver-1');
    const driver2 = getValue('driver-2');
    const waDriver = getValue('wa-driver');
    const penjemputan = getValue('penjemputan');
    const tujuan = getValue('tujuan');

    console.log('Value of sheet: ', sheet);

    // string massage konfirmasi Pesanan
    const pesanKonfirmAwal = `Hi ${name}
                Mohon maaf kami mengganggu waktu anda 🙏
                Kami dari ${agen}
                ingin konfirmasi untuk memastikan keberangkatan Travel Sebagai Berikut:
                Alamat Pick Up: ${alamatJemput}
                Alamat Tujuan: ${alamatTujuan}
                Jumlah Pemesanan: ${data} ${tipe}
                Apa bisa dibantu sharelok penjemputan untuk mengarahkan driver kami pada tanggal Penjemputan ${tanggal} ?🙏
                Terimakasih Atas Waktunya
                Semoga Hari ini Penuh Dengan Kebahagiaan🙏`;

    // string massage konfirmasi driver
    const massageKonfrimDriver = `Hi ${name} 
                        Mohon maaf kami mengganggu waktu anda 🙏

                        Untuk Driver yang bertugas hari ini adalah :
                        ${driver1} dan ${driver2} 

                        Dengan Nomer Driver :
                        ${waDriver} 

                        Terimakasih Atas Pesanan Anda
                        Selalu Selamat Sampai Tujuan dan Menikmati Perjalanan Bersama Dengan Kami.

                        Salam Hangat dan Sampai bertemu di lain Kesempatan 🙏 `;

    // string massage konfirmasi Final
    const massageKonfrimFinal = `Hi ${driver1} Dan ${driver2}
    Selalu Semangat dan Tetap Waspada Dalam Menjalankan Pekerjaan Anda 🙏

    Berikut adalah data Pick Up dan Sharelok Penumpang Anda :

    Nama Penumpang       : ${name}
    Nomor Pemesan        : ${tiket}
    Alamat Penjemputan   : ${alamatJemput}
    Sharelok Penjemputan : ${penjemputan}
    Tujuan               : ${tujuan}
    Sharelok Tujuan      : ${tujuan}

    Keterangan PICK UP : ${data} ${agen}

    Tiket  : ${tiket}
    ST     : ${st}
    FE     : ${fee}

    AGEN : ${agen}

    Tetap Berdo'a dan Bersyukur Dalam Menjalankan Pekerjaan Anda
    Kewaspadaan Anda Adalah Harapan Selamat Penumpang Anda
    Selalu Selamat Sampai Tujuan 😊`;

    // Konforimasi 
    const encodedPesanKonfirmAwal = encodeURIComponent(pesanKonfirmAwal);
    const konfirm = `=HYPERLINK("https://api.whatsapp.com/send?phone=${waPesan}&text=${encodedPesanKonfirmAwal}"; "Konfirm")`;
    // konfirmasi Driver
    const encodePesanKonfirmDriver = encodeURIComponent(massageKonfrimDriver);
    const konfirmDriver = `=HYPERLINK("https://api.whatsapp.com/send?phone=${waPesan}&text=${encodePesanKonfirmDriver}"; "RUN")`;
    // konfirm closing order
    const encodedPesanKonfirmFinal = encodeURIComponent(massageKonfrimFinal);
    const konfirmFinal = `=HYPERLINK("https://api.whatsapp.com/send?phone=${waPesan}&text=${encodedPesanKonfirmFinal}"; "CLOSING")`

    // Masukkan nilai tersebut ke textarea
    document.getElementById('massage-konfrim-final').value = massageKonfrimFinal;
    document.getElementById('massage').value = pesanKonfirmAwal;
    document.getElementById('massage-konfrim-driver').value = massageKonfrimDriver;
    document.getElementById('konfirm').value = konfirm;
    document.getElementById('konfirmDriver').value = konfirmDriver;
    document.getElementById('konfirmFinal').value = konfirmFinal;

    // Buat objek data dengan nilai dari form
    const formData = {
        sheet,
        name,
        tanggal,
        alamatTujuan,
        alamatJemput,
        tipe,
        data,
        agen,
        tiket,
        st,
        fee,
        konfirm,
        konfirmDriver,
        konfirmFinal,
        pesanKonfirmAwal,
        waPesan,
        driver1,
        driver2,
        waDriver,
        penjemputan,
        tujuan,
        massageKonfrimDriver,
        massageKonfrimFinal 
    };

    console.log('Data to be sent:', formData); 

    try {
        const response = await fetch('https://backend-6es6.vercel.app/', { // URL backend Express.js https://backend-fcnj4p8iv-benjis-projects-2d9aa7eb.vercel.app/submit
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Success:', result);
    } catch (error) {
        console.error('Error:', error);
    }
});
