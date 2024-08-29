'''
# Network Packet Simulator

This project is a network packet simulator built with Flask and React. It allows users to configure and send custom Ethernet frames with specified payloads, focusing on Layer 2 and UDP communication. The project consists of a Flask-based backend and a React-based frontend, providing a user-friendly interface for creating and sending network messages.

## Features

- **Custom Ethernet Packet Creation**: Configure and send Ethernet frames with custom source and destination MAC addresses, EtherType, and payloads.
- **Layer 2 and UDP Communication**: Focuses on Layer 2 communication and UDP protocol for network message transmission.
- **Dynamic Form Generation**: The frontend dynamically generates forms based on JSON configuration files, allowing users to create and modify messages easily.
- **Checksum Calculation**: Optional CRC checksum calculation and appending to the payload.
- **Periodic Message Sending**: Simulate continuous data transmission by sending messages periodically at a user-defined frequency.
- **Settings Management**: Update and manage default settings like MAC addresses and EtherType through the user interface.

## Installation

### Backend

1. **Clone the repository**:
   ```bash
   git clone git@github.com:ozanozkayatr/package-manager.git
   cd package-manager/backend
'''
