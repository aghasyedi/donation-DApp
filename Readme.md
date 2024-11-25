# Future Minds Foundation

**Empowering Minds, Shaping Futures**

A simple decentralized application (DApp) for making and checking donations on the Ethereum blockchain. This project uses Python, Flask, Solidity, and Web3.js to create a seamless interface for interacting with smart contracts on the blockchain.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Smart Contract](#smart-contract)
- [Testing the DApp](#testing-the-dapp)
- [License](#license)
- [Author Information](#author-information)

## Overview

The **Donation DApp** is a simple Ethereum-based application that allows users to:

- Connect their Ethereum wallet (using MetaMask).
- Make donations in Ether (ETH).
- Check donation history for a specific wallet address.

This DApp leverages Web3.js on the frontend for interacting with Ethereum and Solidity smart contracts deployed on the Ethereum network (or a local Ganache network for testing).

### Key Features:

- **Wallet Connection**: Users can easily connect their wallet using MetaMask.
- **Make Donations**: Send ETH donations to the contract.
- **Check Donations**: View the donation history for a specific wallet address.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (Web3.js)
- **Backend**: Python (Flask)
- **Blockchain**: Solidity (Ethereum Smart Contract)
- **Wallet Integration**: MetaMask
- **Ethereum Network**: Ganache (for local testing), Ethereum Mainnet or Testnets (for deployment)

## Features

- **MetaMask Integration**: Enables secure wallet connection and Ethereum transactions.
- **Donation Function**: Allows users to donate ETH to a smart contract.
- **Donation Check**: Allows users to check how much a specific address has donated.
- **Responsive UI**: Works well on both mobile and desktop devices.
- **Transaction Feedback**: Users get feedback on successful donations or errors.

## Getting Started

To run the Donation DApp locally, follow these steps.

### Prerequisites

- **Python**: Ensure Python 3.x is installed on your machine.
- **Node.js**: Install Node.js to work with Web3.js.
- **MetaMask**: Install MetaMask browser extension for wallet management.
- **Ganache**: Install Ganache for local Ethereum blockchain development.
- **Flask**: Python web framework for running the backend server.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/donation-dapp.git
   cd donation-dapp
   ```

2. **Install Python dependencies**:
   Create and activate a virtual environment, then install Flask and Web3:

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install flask web3
   ```

3. **Install frontend dependencies**:
   For the frontend, you’ll need to install Web3.js:

   ```bash
   npm install web3
   ```

4. **Set up Ganache**:

   - Download and install Ganache from [Ganache's website](https://www.trufflesuite.com/ganache).
   - Start Ganache and use the provided Ethereum RPC URL (e.g., `http://127.0.0.1:8545`).

5. **Deploy the Smart Contract**:

   - Write your Solidity smart contract (or use the example provided).
   - Deploy the contract to Ganache or any other Ethereum network using Remix, Truffle, or Hardhat.
   - Update the contract address in your frontend code.

6. **Update Configuration**:
   - In the frontend `index.html` file, update the `contractAddress` with your deployed contract's address.
   - Ensure the backend Flask server (`app.py`) is running on the same port and interacting with the correct contract.

### Running the Application

1. **Run the Flask backend**:

   ```bash
   python app.py
   ```

   The Flask server should now be running on `http://127.0.0.1:5000`.

2. **Open the frontend**:
   Open `index.html` in your web browser to interact with the DApp.

3. **Connect your wallet**:
   Open MetaMask and connect it to your local Ganache network (or Ethereum network).

4. **Start donating**:
   Use the UI to connect your wallet, make donations, and check donation history.

## Project Structure

```plaintext
donation-dapp/
│
├── app.py                # Flask backend server
├── contract.sol          # Solidity smart contract
├── templats/index.html            # Frontend HTML
├── static/style.css             # CSS for styling the frontend
├── Donation.json          # Bytecode for Solidity Code
└── README.md             # Project documentation
```

## Screenshots
1. **Login/Connect Wallet Page**
![01](https://github.com/user-attachments/assets/ed44b693-ef71-4725-9cf6-ca0956358c71)

2. **Main Page**
![02](https://github.com/user-attachments/assets/09daa045-8024-4c65-8c04-2992a12d3a07)
