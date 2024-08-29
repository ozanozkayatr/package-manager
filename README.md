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

2. **Create a virtual environment (optional but recommended)**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt

4. **Run the Flask app**:
   ```bash
   flask run

### Frontend

1. **Navigate to the frontend directory**

    ```bash
    cd ../frontend

2. **Install dependencies**:

    ```bash
    npm install

3. **Start the React app**:

    ```bash
    npm start

## Usage

1. **Launch the Backend**:
   - Ensure your Flask server is running on `http://localhost:5000`.
   - If not already running, navigate to the backend directory and start the server:
     ```bash
     cd backend
     flask run
     ```

2. **Start the Frontend**:
   - Make sure the React app is running on `http://localhost:3000`.
   - If not already running, navigate to the frontend directory and start the React app:
     ```bash
     cd frontend
     npm start
     ```

3. **Access the Application**:
   - Open your web browser and go to `http://localhost:3000`.

4. **Select a Device Configuration**:
   - On the main page, choose a device configuration from the available options.
   - The form will automatically populate based on the selected JSON configuration.

5. **Modify Message Fields**:
   - Adjust the form fields as necessary to customize the Ethernet packet.

6. **Send the Message**:
   - Click the "SEND" button to submit the form.
   - The backend will process the data and send the custom Ethernet packet.

7. **Update Settings (Optional)**:
   - Navigate to the settings page by clicking the settings icon.
   - Update the source MAC, destination MAC, and EtherType as needed.
   - Click "Save" to apply the changes.


## Endpoints

- **POST /api/messages**: 
  - **Description**: Receives message data from the frontend, constructs an Ethernet packet, and sends it.
  - **Request Body**: Expects a JSON object containing the fields defined by the selected device configuration. Optionally includes a checksum field if required by the configuration.
  - **Response**: Returns a JSON object with a status message indicating success or failure.

- **POST /api/settings**: 
  - **Description**: Updates the default MAC addresses and EtherType used in packet construction.
  - **Request Body**: Expects a JSON object containing `srcMac`, `dstMac`, and `etherType` fields.
  - **Response**: Returns a JSON object with a status message indicating success or failure.

## JSON Configuration Files

The frontend uses JSON files to define the structure of the messages that can be sent through the application. Each JSON file corresponds to a different device configuration and contains a set of UI components that dictate the form fields and their properties.

### Location
- The JSON configuration files are located in the `frontend/src/Devices` directory.

### Structure
Each JSON file follows a specific structure to define the available message components. Here’s an example of what a JSON configuration might look like:

```json
{
  "uiSets": [
    {
      "name": "Message 1",
      "components": [
        {
          "label": "Field 1",
          "type": "text",
          "value": "default_value",
          "bytes": 4
        },
        {
          "label": "Field 2",
          "type": "number",
          "value": 10,
          "bytes": 2
        }
      ]
    }
  ],
  "checksum": true
}
```
## Project Structure

The project is organized into two main directories: `backend` and `frontend`. Here’s an overview of the directory structure:



### Explanation
- **backend/**: Contains all backend-related code, including the Flask application (`app.py`) and dependencies (`requirements.txt`).
- **frontend/**: Contains all frontend-related code, built with React. This includes components, device configurations, and other resources.
- **src/components/**: Houses the main React components such as `AppSimulator.js` and `Settings.js`.
- **src/Devices/**: Contains JSON files that define the configuration for various devices.
- **public/**: Contains static assets like images and icons.
- **package.json**: Lists Node.js dependencies and scripts for the frontend.

