import yt_dlp


def handler(event, context):
    try:
        # Extract the YouTube URL from the query string
        if "videoUrl" not in event['queryStringParameters']:
            return {
                "statusCode": 400,
                "body": "No video URL provided."
            }

        video_url = event['queryStringParameters']['videoUrl']

        # Validate the URL
        if not video_url:
            raise ValueError("Empty video URL.")

        # Attempt to download the video using yt_dlp
        with yt_dlp.YoutubeDL({'format': 'bestaudio/best'}) as ydl:
            ydl.download([video_url])

        # Return success response
        return {
            "statusCode": 200,
            "body": "Download successful!"
        }

    except Exception as e:
        # Log error for debugging
        print("Error during download:", e)
        return {
            "statusCode": 500,
            "body": f"Error: {str(e)}"
        }
