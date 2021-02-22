pragma solidity ^0.7.4;

// Replace Chainlink <> Provable in due time
// import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";



contract ExchangeRates is ChainLinkClient {
    /**
        Network: Kovan Test Network
    */

    address private oracle;
    string private athleteEquityAPI;


    constructor() public {
        setPublicChainlinkToken();
        oracle = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
        jobId = "29fa9aa13bf1468788b7cc4a500a45b8";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }

    function getAPIRequest() public returns ()
    {

    }
}