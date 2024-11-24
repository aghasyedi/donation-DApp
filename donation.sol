// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {
    // Mapping to track donations
    mapping(address => uint256) public donations;

    event DonationReceived(address indexed donor, uint256 amount);

    function donate() public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        donations[msg.sender] += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    function getDonation(address donor) public view returns (uint256) {
        return donations[donor];
    }
}
