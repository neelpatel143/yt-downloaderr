const backendURL = "https://your-backend-url.on.railway.app"; // Update with your backend URL

document.getElementById('download-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const format = document.querySelector('input[name="format"]:checked').value;

    const statusDiv = document.getElementById('status');
    statusDiv.textContent = "Processing...";

    try {
        const response = await fetch(`${backendURL}/download`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, format }),
        });

        if (response.ok) {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `youtube.${format}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            statusDiv.textContent = "Download started!";
        } else {
            statusDiv.textContent = "Failed to download. Please try again.";
        }
    } catch (error) {
        statusDiv.textContent = "Error occurred. Please check the console.";
        console.error(error);
    }
});
