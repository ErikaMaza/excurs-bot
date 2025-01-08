import socket
import json
import asyncio

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from assets.parser.parser import main


try:
    ip = "127.0.0.1"
    port = 2005
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((ip, port))
    server.listen(port)


    def start_server():
        while True:
            try:
                clinet_socket, address = server.accept()
                data = clinet_socket.recv(1024).decode("utf-8")
                res_content = data_processing(data)
                clinet_socket.send(res_content)
                shutdown_server(clinet_socket)

            except KeyboardInterrupt as e:
                print("server: close server")
                shutdown_server(clinet_socket)

            except Exception as e:
                shutdown_server(clinet_socket)


    def data_processing(response_data):
        headers_ok = "HTTP/1.1 200 OK\r\nContent-Type: application/json; charset=utf-8\r\n\r\n".encode(
            "utf-8")
        headers_fail = "HTTP/1.1 400 FAIl\r\nContent-Type: application/json; charset=utf-8\r\n\r\n".encode(
            "utf-8")

        try:
            print(response_data)
            s = response_data.splitlines()
            data = json.loads(s[-1])
            funct = data["funct"]
            print(funct)

            if funct == "start_parser":
                asyncio.run(main())
            return headers_ok

        except IndexError:
            print("server-req: Fail IndexError")
            return headers_fail


    def shutdown_server(client_socket):
        client_socket.shutdown(socket.SHUT_WR)


    start_server()

except KeyboardInterrupt:
    print("shutting down the server")
