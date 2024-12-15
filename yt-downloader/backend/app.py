from flask import Flask, request, jsonify, send_file
from yt_dlp import YoutubeDL
import os

app = Flask(__name__)

@app.route('/download', methods=['POST'])
def download():
    data = request.json
    url = data.get('url')
    format = data.get('format', 'mp3')

    options = {
        'format': 'bestaudio' if format == 'mp3' else 'best',
        'outtmpl': f'temp.%(ext)s',
        'postprocessors': [{'key': 'FFmpegExtractAudio', 'preferredcodec': 'mp3'}] if format == 'mp3' else None
    }

    try:
        with YoutubeDL(options) as ydl:
            ydl.download([url])

        file_path = 'temp.mp3' if format == 'mp3' else 'temp.mp4'
        return send_file(file_path, as_attachment=True)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Clean up downloaded files
        if os.path.exists('temp.mp3'):
            os.remove('temp.mp3')
        if os.path.exists('temp.mp4'):
            os.remove('temp.mp4')

if __name__ == '__main__':
    app.run(debug=True)
