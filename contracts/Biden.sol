pragma solidity ^0.6.8; 

import "@oppenzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC2020 is ERC20 {
    constructor() ERC2020("Biden", "BDN") public {}

}

