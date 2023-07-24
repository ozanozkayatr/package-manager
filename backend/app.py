from flask import Flask, request, jsonify
from flask_cors import CORS
import socket
import struct
import re

app = Flask(__name__)
CORS(app)

settings = {
  'src_mac': '30:9c:23:df:d2:5f',
  'dst_mac': '66:77:88:99:aa:bb',
  'ether_type': '0xDD04',
}

def send_packet(src_mac, dst_mac, ether_type, payload):
    socket_obj = socket.socket(socket.AF_PACKET, socket.SOCK_RAW)
    interface = 'enp24s0'

    src_mac_bytes = bytes.fromhex(src_mac.replace(':', ''))
    dst_mac_bytes = bytes.fromhex(dst_mac.replace(':', ''))
    ether_type_bytes = struct.pack('!H', int(ether_type, 16))

    packet = src_mac_bytes + dst_mac_bytes + ether_type_bytes + payload

    socket_obj.bind((interface, 0))
    socket_obj.send(packet)

def calculate_crc(data):
    crc = 0xffff
    polynomial = 0x1021

    buffer = []

    data_string = hex(data)[2:]
    for i in range(0, len(data_string), 2):
        buffer.append(int(data_string[i:i + 2], 16))

    for index in range(len(buffer)):
        crc ^= buffer[index] << 8

        for i in range(8):
            if crc & 0x8000:
                crc = (crc << 1) ^ polynomial
            else:
                crc = crc << 1

    return crc & 0xffff

@app.route('/api/messages', methods=['POST'])
def receive_messages():
    global settings

    received_data = request.get_json()
    payload = bytearray()

    for component in received_data['uiSets']:
        value = component['value']
        if isinstance(value, int):
            payload.extend(value.to_bytes(component['bytes'], byteorder='big'))
        elif isinstance(value, str):
            payload.extend(bytes.fromhex(value))

    if received_data['checksum']:
        # Calculate CRC 
        crc = calculate_crc(int.from_bytes(payload, byteorder='big'))

        # Append CRC 
        payload += crc.to_bytes(2, byteorder='big')

    # Use the values from `settings` instead of the constants
    send_packet(settings['src_mac'], settings['dst_mac'], settings['ether_type'], payload)  

    return jsonify({'status': 'success'}), 200

@app.route('/api/settings', methods=['POST'])
def update_settings():
    global settings
    new_settings = request.get_json()
    print(f"Received new settings: {new_settings}")  # Debug line

    # if the new value is not empty, use it. Otherwise, use the default value
    settings.update({
        'src_mac': new_settings['srcMac'] if new_settings['srcMac'] else settings['src_mac'],
        'dst_mac': new_settings['dstMac'] if new_settings['dstMac'] else settings['dst_mac'],
        'ether_type': new_settings['etherType'] if new_settings['etherType'] else settings['ether_type'],
    })

    print(f"Updated settings: {settings}")  # Debug line
    return jsonify({ 'status': 'success' }), 201
