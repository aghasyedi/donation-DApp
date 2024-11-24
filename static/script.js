let web3;
let userAddress;
let contract;

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

document.getElementById("connect").onclick = async () => {
  if (window.ethereum) {
    try {
      web3 = new Web3(window.ethereum);
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      userAddress = accounts[0];
      document.getElementById("wallet").innerText = userAddress;
      const balanceWei = await web3.eth.getBalance(userAddress);
      const balanceEther = web3.utils.fromWei(balanceWei, "ether");
      document.getElementById("balance").innerText = balanceEther;
      contract = new web3.eth.Contract(abi, contractAddress);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Something went wrong. Please try again.");
    }
  } else {
    alert("Please install MetaMask!");
  }
};

document.getElementById("donate").onclick = async () => {
  const amount = document.getElementById("amount").value;

  if (!userAddress) {
    alert("Connect wallet!");
    return;
  }
  if (!amount) {
    alert("Enter a valid amount!");
    return;
  }

  const amountInWei = web3.utils.toWei(amount, "ether");

  try {
    const tx = await contract.methods.donate().send({
      from: userAddress,
      value: amountInWei,
    });

    document.getElementById(
      "donateMessage"
    ).innerText = `Transaction sent! Tx Hash: ${tx.transactionHash}`;
  } catch (error) {
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
