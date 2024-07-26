// Looping Dropdown dari 1-30
document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('sheet');
    const dropdown = document.getElementById('dropdown');
    const dropdownItems = document.getElementById('dropdown-items');

    input.addEventListener('click', function () {
        dropdown.classList.toggle('hidden');
    });

    let citiesData = [];

    fetch('./data/looping.json')
        .then(response => response.json())
        .then(data => {
            citiesData = data;
            updateDropdown(citiesData);
        })
        .catch(error => console.error('Error fetching data:', error)); // Handle fetch error

    function updateDropdown(cities) {
        dropdownItems.innerHTML = ''; // Clear only the dropdown items
        cities.forEach(city => {
            const item = document.createElement('div');
            item.classList.add('dropdown-item', 'px-4', 'py-2', 'cursor-pointer', 'hover:bg-gray-200', 'flex', 'justify-between', 'items-center');
            item.dataset.value = city.name.toLowerCase();

            item.innerHTML = `
                <div>
                    <div class="font-medium city-name">${city.name}</div>
                    <div class="text-sm text-gray-500">${city.description}</div>
                </div>
                <button class="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">${city.code}</button>
            `;

            item.addEventListener('click', function () {
                input.value = city.name;
                input.dataset.value = city.name.toLowerCase();
                dropdown.classList.add('hidden');
            });

            dropdownItems.appendChild(item);
        });
    }

    input.addEventListener('input', function () {
        const searchValue = input.value.toLowerCase();
        const filteredCities = citiesData.filter(city => city.name.toLowerCase().includes(searchValue));
        updateDropdown(filteredCities);
    });

    document.addEventListener('click', function (e) {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
});

// dropdown tanpa looping dari json
document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('tipedata');
    const content = document.getElementById('konten');
    input.addEventListener('click', function () {
        content.classList.toggle('hidden');
    });
    const kontenitem = document.querySelectorAll('.konten-item');
    kontenitem.forEach(item => {
        item.addEventListener('click', function () {
            input.value = item.querySelector('.value').textContent;
            input.dataset.value = item.dataset.value;
            content.classList.add('hidden');
        });
    });
    document.addEventListener('click', function (e) {
        if (!input.contains(e.target) && !content.contains(e.target)) {
            content.classList.add('hidden');
        }
    });
});

// Mengurangi dan menambahkan nilai 
document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('tampung');
    const btnDecrease = document.getElementById('ngurang');
    const btnIncrease = document.getElementById('nambah');

    btnDecrease.addEventListener('click', function () {
        let currentValue = parseInt(inputField.value) || 0;
        if (currentValue > 0) { // Ensure the value doesn't go below 0
            inputField.value = currentValue - 1;
        }
    });

    btnIncrease.addEventListener('click', function () {
        let currentValue = parseInt(inputField.value) || 0;
        inputField.value = currentValue + 1;
    });
});
