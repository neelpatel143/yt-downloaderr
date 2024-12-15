document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.getElementById("downloadBtn");
    const videoUrlInput = document.getElementById("videoUrl");
    const responseText = document.getElementById("responseText");
  
    downloadBtn.addEventListener("click", async () => {
      const videoUrl = videoUrlInput.value;
  
      if (!videoUrl) {
        responseText.innerText = "Please enter a valid YouTube URL.";
        return;
      }
  
      responseText.innerText = "Processing download...";
      try {
        const res = await fetch(
          `/download?videoUrl=${encodeURIComponent(videoUrl)}`,
          {
            method: "GET",
          }
        );
  
        const data = await res.json();
        console.log("Response:", data);
  
        if (res.ok) {
          responseText.innerText = data.body || "Download successful!";
        } else {
          responseText.innerText = `Server Error: ${data.body}`;
        }
      } catch (error) {
        console.error("Error:", error);
        responseText.innerText = "Unable to process request.";
      }
    });
  });
  