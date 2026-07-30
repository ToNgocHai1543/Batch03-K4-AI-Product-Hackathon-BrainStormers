"""
VLearn AI Learning Bridge — Backend API & Static HTTP Server (Task 3.4)
Serves static UI files (index.html, style.css, app.js) and REST API Endpoints:
- GET /api/session?pair=d1-d2 : Generates/Loads AI Learning Bridge JSON from LLM Client
- POST /api/feedback : Saves user error correction feedback to codebase/outputs/feedback.json
"""

import os
import re
import sys
import json
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

# Ensure UTF-8 output on Windows console
if sys.platform == 'win32' and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Directory paths
SRC_DIR = Path(__file__).resolve().parent
BASE_DIR = SRC_DIR.parents[1]
OUTPUTS_DIR = BASE_DIR / "codebase" / "outputs"
OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)

# Add src to sys.path so we can import llm_client & data_loader
sys.path.insert(0, str(SRC_DIR))

try:
    from llm_client import LLMBridgeClient
    llm_engine = LLMBridgeClient()
except Exception as e:
    print(f"[Server Warning] Could not initialize LLMBridgeClient: {e}")
    llm_engine = None


class VLearnRequestHandler(SimpleHTTPRequestHandler):
    """Custom Request Handler for VLearn Static Assets & REST API Endpoints."""

    def __init__(self, *args, **kwargs):
        # Set directory to codebase/src/ for serving index.html, style.css, app.js directly at root
        super().__init__(*args, directory=str(SRC_DIR), **kwargs)

    def end_headers(self):
        # Enable CORS for local testing
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        query_params = urllib.parse.parse_qs(parsed_url.query)

        # Route: GET /api/session?pair=d1-d2
        if parsed_url.path == '/api/session':
            session_pair = query_params.get('pair', ['d1-d2'])[0]
            self._handle_get_session_api(session_pair)
            return

        # Default: serve static files from codebase/src/
        return super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)

        # Route: POST /api/feedback
        if parsed_url.path == '/api/feedback':
            self._handle_post_feedback_api()
            return

        self.send_error(404, "Endpoint not found")

    def _handle_get_session_api(self, session_pair: str):
        """Generates or fetches AI Learning Bridge JSON trace data for the requested pair."""
        print(f"[API GET] /api/session requested for pair: {session_pair}")

        result_data = None
        if llm_engine:
            try:
                result_data = llm_engine.generate_learning_bridge(session_pair)
            except Exception as e:
                print(f"[API Error] LLM engine failed: {e}")

        # Fallback to reading pre-generated trace file if engine unavailable
        if not result_data:
            trace_file = OUTPUTS_DIR / f"trace_{session_pair.replace('-', '_')}.json"
            if trace_file.exists():
                try:
                    with open(trace_file, 'r', encoding='utf-8') as f:
                        result_data = json.load(f)
                except Exception as e:
                    print(f"[API Warning] Failed reading trace file: {e}")

        if not result_data:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Failed to generate or load session data"}).encode('utf-8'))
            return

        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(json.dumps(result_data, ensure_ascii=False).encode('utf-8'))

    def _handle_post_feedback_api(self):
        """Saves user error-correction feedback to codebase/outputs/feedback.json."""
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body_bytes = self.rfile.read(content_length)
            feedback_data = json.loads(body_bytes.decode('utf-8'))

            print(f"[API POST] Received feedback: {feedback_data.get('category')}")

            # File path for feedback log
            feedback_file = OUTPUTS_DIR / "feedback.json"
            existing_feedback = []
            if feedback_file.exists():
                try:
                    with open(feedback_file, 'r', encoding='utf-8') as f:
                        existing_feedback = json.load(f)
                except Exception:
                    existing_feedback = []

            existing_feedback.append(feedback_data)

            with open(feedback_file, 'w', encoding='utf-8') as f:
                json.dump(existing_feedback, f, ensure_ascii=False, indent=2)

            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            response_payload = {
                "status": "success",
                "message": "Feedback saved to codebase/outputs/feedback.json",
                "log_count": len(existing_feedback)
            }
            self.wfile.write(json.dumps(response_payload, ensure_ascii=False).encode('utf-8'))

        except Exception as e:
            print(f"[API Error] Feedback POST error: {e}")
            self.send_response(400)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))


def run_server(port: int = 8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, VLearnRequestHandler)
    print(f"🚀 VLearn AI Learning Bridge Backend & Static Server running at http://localhost:{port}/")
    print(f"   - UI Frontend: http://localhost:{port}/index.html")
    print(f"   - REST API: http://localhost:{port}/api/session?pair=d1-d2")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping VLearn server...")
        httpd.server_close()


if __name__ == '__main__':
    port_arg = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    run_server(port_arg)
