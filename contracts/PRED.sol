//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PRED is ERC20("PRED Prediction","PRED"){
    constructor(){
        _mint(msg.sender, 1000000000000000000000000000);
    }
}