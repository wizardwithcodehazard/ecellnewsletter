document.getElementById('emailForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const responseMessage = document.getElementById('responseMessage');

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyl_sB3vNiOTq_J1tvldOqMGPlhwSBoIK44eba7E3QDO2ZvS4geqUn6apOgNacdGEK-VQ/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ email }),
        });

        if (response.ok) {
            const result = await response.json();
            responseMessage.textContent = result.message || 'Email saved successfully!';
            responseMessage.className = 'success';  // Set message style to success
            document.getElementById('email').value = '';  // Clear the input field
        } else {
            const error = await response.json();
            responseMessage.textContent = `Error: ${error.message || 'Unknown error occurred'}`;
            responseMessage.className = 'error';  // Set message style to error
        }
    } catch (error) {
        console.error('Fetch error:', error);
        responseMessage.textContent = 'An error occurred. Please try again later.';
        responseMessage.className = 'error';  // Set message style to error
    }
});
