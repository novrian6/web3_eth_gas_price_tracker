/* 
Developer: Nova Novriansyah

*/
// Function to fetch and display gas prices
async function fetchGasPrice() {
    try {
        const response = await fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle');
        const data = await response.json();

        if (data.status === "1") {
            // Get the current gas prices
            const rapid = data.result.FastGasPrice;
            const fast = data.result.ProposeGasPrice;
            const standard = data.result.SafeGasPrice;

            // Display the gas prices on the webpage
            document.getElementById('gasPrice').innerHTML = `
                <p><strong>Rapid:</strong> ${rapid} Gwei</p>
                <p><strong>Fast:</strong> ${fast} Gwei</p>
                <p><strong>Standard:</strong> ${standard} Gwei</p>
            `;
        } else {
            throw new Error(data.message || "Unknown error");
        }
    } catch (error) {
        console.error('Error fetching gas prices:', error);
        document.getElementById('gasPrice').innerHTML = '<p>Error fetching gas prices. Please try again later.</p>';
    }
}

// Call the fetchGasPrice function initially
fetchGasPrice();

// Fetch gas prices every 30 seconds
setInterval(fetchGasPrice, 30000);
