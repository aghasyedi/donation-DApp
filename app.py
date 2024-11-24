from flask import Flask, render_template, jsonify
from web3 import Web3

app = Flask(__name__)

ganache_url = "http://127.0.0.1:7545" 
web3 = Web3(Web3.HTTPProvider(ganache_url))

@app.route('/')
def index():
    return render_template('index.html')

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