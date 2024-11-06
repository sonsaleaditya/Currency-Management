// Fetch Price Data
async function fetchPriceData() {
    try {
        const response = await fetch('/api/tickers');
        const data = await response.json();
        const tableBody = document.getElementById('price-table-body');

        tableBody.innerHTML = ''; // Clear existing table data

        let bestPrice = Infinity;
        
        data.forEach((ticker, index) => {
            const row = document.createElement('tr');
            const difference = (((ticker.last - ticker.buy) / ticker.buy) * 100).toFixed(2);
            const savings = (ticker.last - ticker.buy).toFixed(2);

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${ticker.name}</td>
                <td>₹${ticker.last}</td>
                <td>₹${ticker.buy} / ₹${ticker.sell}</td>
                <td class="${difference >= 0 ? 'positive' : 'negative'}">${difference}%</td>
                <td class="${savings >= 0 ? 'positive' : 'negative'}">₹${savings}</td>
            `;
            tableBody.appendChild(row);

            if (parseFloat(ticker.last) < bestPrice) {
                bestPrice = parseFloat(ticker.last);
            }
        });

        document.getElementById('best-price').innerText = `₹ ${bestPrice.toFixed(2)}`;
    } catch (error) {
        console.error('Error fetching price data:', error);
    }
}

// Countdown Timer
let countdownValue = 59;
const countdownElement = document.getElementById('countdown');
setInterval(() => {
    countdownElement.textContent = countdownValue;
    countdownValue = countdownValue === 0 ? 59 : countdownValue - 1;
}, 1000);

// Theme Toggle (Light/Dark Mode)
const modeToggleContainer = document.getElementById('mode-toggle-container');
const header = document.querySelector('.header');
const tableRows = document.querySelectorAll('tbody tr');
const controls = document.querySelectorAll('.control-button');
const connectButton = document.querySelector('.connect-button');

modeToggleContainer.addEventListener('click', () => {
    modeToggleContainer.classList.toggle('active');
    header.classList.toggle('white');
    tableRows.forEach(row => row.classList.toggle('white'));
    controls.forEach(control => control.classList.toggle('white'));
    connectButton.classList.toggle('white');

    if (modeToggleContainer.classList.contains('active')) {
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
    } else {
        document.body.style.backgroundColor = '#191D28';
        document.body.style.color = '#fff';
    }
});

// Fetch price data when the page loads
window.onload = fetchPriceData;
