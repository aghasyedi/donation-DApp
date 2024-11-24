from flask import Flask, json, render_template, request, jsonify
from web3 import Web3

app = Flask(__name__)

ganache_url = "http://127.0.0.1:7545" 
web3 = Web3(Web3.HTTPProvider(ganache_url))

# contract_address = web3.to_checksum_address("0xBC1D83d2071bcBed8757a4B6Dc4fc5641A9bB28B")  # Replace with deployed contract address
# contract_abi = [
#     # Paste the ABI from your deployed contract
# ]
# # Load contract ABI and address
# try:
#     with open('Donation.json', 'r') as contract_file:
#         contract_data = json.load(contract_file)
#         acontract_abi = contract_data['abi']
# except FileNotFoundError:
#     print("Contract ABI file not found. Please ensure the path is correct.")
#     exit()
# except KeyError as e:
#     print(f"KeyError: {e} not found in the contract ABI JSON file.")
#     exit()


# Connect to the contract
# contract = web3.eth.contract(address=contract_address, abi=contract_abi)

@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/donate', methods=['POST'])
# def donate():
#     try:
#         data = request.json
#         user_address = web3.to_checksum_address(data.get("address"))
#         private_key = data.get("pvtkey")
#         amount_in_ether = float(data.get("amount"))
#         amount_in_wei = web3.to_wei(amount_in_ether, 'ether')

#         # Set up contract instance
#         contract_address = "0xYourContractAddress"  # Replace with actual contract address
#         abi = [...]  # ABI of the deployed contract
#         contract = web3.eth.contract(address=contract_address, abi=abi)

#         # Build the transaction to call the 'donate' function
#         txn = contract.functions.donate().build_transaction({
#             'from': user_address,
#             'value': amount_in_wei,
#             'gas': 2000000,
#             'gasPrice': web3.to_wei('50', 'gwei'),
#             'nonce': web3.eth.get_transaction_count(user_address),
#         })

#         # Sign the transaction using the private key
#         signed_txn = web3.eth.account.sign_transaction(txn, private_key=private_key)

#         # Send the transaction
#         tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)

#         # Return the transaction hash
#         return jsonify({'tx_hash': web3.to_hex(tx_hash)})

#     except Exception as e:
        # return jsonify({'error': str(e)}), 400


@app.route('/get_donation/<user_address>', methods=['GET'])
def get_donation(user_address):
    try:
        user_address = web3.to_checksum_address(user_address)
        print(f"Fetching donations for address: {user_address}")
        
        total_donation = 0

        latest_block = web3.eth.block_number
        print(f"Scanning blocks 0 to {latest_block}")

        for block_num in range(latest_block + 1):
            block = web3.eth.get_block(block_num, full_transactions=True)

            for tx in block.transactions:
                if tx["from"] == user_address:
                    total_donation += tx["value"]

        total_donation_in_ether = web3.from_wei(total_donation, 'ether')

        return jsonify({'address': user_address, 'donation': str(total_donation_in_ether)})
    except Exception as e:
        print(f"Error fetching donation for {user_address}: {e}")
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    """
    Author: Agha Tasheer Syedi
    Date: 2024-11-24
    Description: This module handles the donation functionality for the DApp.
    Version: 1.0.0
    """
    app.run(debug=True)
