pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contact GLDToken is ERC20, ERC20Detailed {
    construtor(uint256 initSupply) ERC20Detailed("Gold", "GLD", 18) public {
        _mint(msg.sender, initSupply);
    }
}

