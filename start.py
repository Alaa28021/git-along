"""Git Along — local launcher.

Run:  python start.py
It serves this folder on http://localhost:8080 (or the next free port) and opens the browser.
The game uses JavaScript modules, which browsers block when index.html is opened as a file,
so it must be served over http.
"""
import http.server
import os
import socket
import socketserver
import webbrowser

ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    # Windows sometimes maps .js to text/plain, which breaks module scripts.
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".js": "application/javascript",
        ".mjs": "application/javascript",
        ".css": "text/css",
        ".svg": "image/svg+xml",
        ".json": "application/json",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # keep the console quiet


def free_port(start=8080):
    for port in range(start, start + 50):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(("127.0.0.1", port)) != 0:
                return port
    raise RuntimeError("No free port found")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 0)) or free_port()
    url = f"http://localhost:{port}/"
    with socketserver.ThreadingTCPServer(("127.0.0.1", port), Handler) as httpd:
        print(f"Git Along is running at {url}  (press Ctrl+C to stop)")
        if not os.environ.get("NO_BROWSER"):
            webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")
