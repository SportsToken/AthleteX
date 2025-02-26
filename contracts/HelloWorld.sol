// SPDX-License-Identifier: <SPDX-License>
pragma solidity 0.7.4;

contract HelloWorld {
    string public message;
    string 

    constructor(string memory initMessage)
    {
        // Classic assignment from constructor
        message = initMessage;
    }

    // very odd that their visiblity keyword is at the end of the method declaration...
    function updateMessage(string memory newMessage) public
    {
        message = newMessage;
    }

    function loopMessage() private returns (bool)
    {
        
    }

    function kys() public pure
    {

    }
}