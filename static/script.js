let web3;
let userAddress;
let contract;

// Contract details
const contractAddress = "0xBC1D83d2071bcBed8757a4B6Dc4fc5641A9bB28B";
const abi = [
  {
    inputs: [],
    name: "donate",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "donor", type: "address" }],
    name: "getDonation",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

// Update wallet and donation balances
const updateBalances = async () => {
  try {
    const balanceWei = await web3.eth.getBalance(userAddress);
    const balanceEther = web3.utils.fromWei(balanceWei, "ether");
    document.getElementById("balance").innerText = balanceEther;

    const donationBalanceWei = await web3.eth.getBalance(contractAddress);
    const donationBalanceEther = web3.utils.fromWei(donationBalanceWei, "ether");
    document.getElementById("total_donation").innerText = donationBalanceEther;
  } catch (error) {
    console.error("Error updating balances:", error);
  }
};

// Handle wallet connection
document.getElementById("connect").onclick = async () => {
  if (window.ethereum) {
    try {
      web3 = new Web3(window.ethereum);

      // Request wallet access
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      userAddress = accounts[0];

      document.getElementById("wallet").innerText = userAddress;

      // Update balances after connecting
      await updateBalances();

      // Initialize contract
      contract = new web3.eth.Contract(abi, contractAddress);

      // Show main content after successful connection
      document.getElementById("mainContent").style.display = "block";
      document.getElementById("connect").style.display = "none";
      document.getElementById("connectMessage").innerText = "Wallet connected successfully!";
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  } else {
    alert("MetaMask not detected. Please install MetaMask to continue.");
  }
};

// Handle donation
document.getElementById("donate").onclick = async () => {
  const amount = document.getElementById("amount").value;

  if (!userAddress) {
    alert("Please connect your wallet first!");
    return;
  }
  if (!amount || isNaN(amount) || amount <= 0) {
    alert("Enter a valid donation amount!");
    return;
  }

  try {
    const amountInWei = web3.utils.toWei(amount, "ether");

    const tx = await contract.methods.donate().send({
      from: userAddress,
      value: amountInWei,
    });

    document.getElementById("donateMessage").innerText = `Donation successful! Tx Hash: ${tx.transactionHash}`;

    // Update balances after donation
    await updateBalances();
  } catch (error) {
    console.error("Donation error:", error);
    document.getElementById("donateMessage").innerText = `Error: ${error.message}`;
  }
};

document.getElementById("checkDonation").onclick = async () => {
  const address = document.getElementById("checkAddress").value;

  if (!address) {
    alert("Please enter a wallet address!");
    return;
  }

  if (!userAddress) {
    alert("Please connect your wallet first!");
    return;
  }

  const checksumAddress = web3.utils.toChecksumAddress(address);

  try {
    const response = await fetch(`/get_donation/${checksumAddress}`);
    const result = await response.json();

    if (result.error) {
      document.getElementById("donationResult").innerText = `Error: ${result.error}`;
    } else {
      document.getElementById(
        "donationResult"
      ).innerText = `Address ${result.address} has donated ${result.donation} ETH.`;
    }
  } catch (error) {
    document.getElementById("donationResult").innerText = `Error: ${error.message}`;
  }
};
