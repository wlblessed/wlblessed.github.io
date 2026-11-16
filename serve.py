#!/usr/bin/env python3
"""Servidor estatico do catalogo WRBLESSED.

Modulos ES e fetch de assets exigem http://; abrir index.html como file:// quebra.
Uso: python3 serve.py [porta] [host]  (default 8091, 0.0.0.0)
"""
import socket
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "text/javascript",
        ".mjs": "text/javascript",
        ".svg": "image/svg+xml",
        ".json": "application/json",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def lan_ip():
    """IP da interface usada para sair na rede local (sem enviar pacote)."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except OSError:
        return "127.0.0.1"


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8091
    host = sys.argv[2] if len(sys.argv) > 2 else "0.0.0.0"
    root = __file__.rsplit("/", 1)[0] or "."
    print(f"http://127.0.0.1:{port}/", flush=True)
    if host != "127.0.0.1":
        print(f"http://{lan_ip()}:{port}/", flush=True)
    ThreadingHTTPServer((host, port), partial(Handler, directory=root)).serve_forever()
