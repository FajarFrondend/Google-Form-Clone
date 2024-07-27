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
        waPesan,
        driver1,
        driver2,
        waDriver,
        penjemputan,
        tujuan
    };

    console.log('Data to be sent:', formData); 

    try {
        const response = await fetch('https://new-express-project-j1jyyure4-benjis-projects-2d9aa7eb.vercel.app/submit', {
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
