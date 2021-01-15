pragma solidity ^0.6.8;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC2020 is ERC20 {
    constructor() ERC20("Trump", "TRP") public {
        totalSupply += 1000;
        balance[msg.sender]+=1000;
    }

}