import React, { Component } from "react";
import { Button, Dropdown, DropdownToggle, Badge } from 'reactstrap';
import { ConnectToMetamaskButton } from '../../utils/swap/eth';
import { ConnectToSolButton } from '../Account/SolWallet';

function AccountPlugin(props) {

    const [dropDownIsOpen, setdropDownIsOpen] = React.useState(false);
    const handleClick = () => {
        setdropDownIsOpen(!dropDownIsOpen);
      };

    return (
        <div className="fixed-plugin">
            <Dropdown isOpen={dropDownIsOpen} toggle={handleClick}>
                <DropdownToggle tag="div">
                    <i className="fa fa-cog fa-2x"></i>
                </DropdownToggle>
                <ul className="dropdown-menu show">
                    <li className="header-title">
                        Setup a wallet
                    </li>
                    <li className="adjustments-line">
                        <div id="SolWallet">
                        <ConnectToSolButton />
                        </div>
                    </li>
                    <li className="adjustments-line">
                        <div id="MetMaskWallet">
                        <ConnectToMetamaskButton />
                        </div>
                    </li>
                    <li className="header-title">Account Details</li>
                    <li>
                        window
                    </li>
                    <li>
                        Public Key:
                        Click me
                    </li>
                    <li></li>
                </ul>
            </Dropdown>
        </div>
    );
}

export default AccountPlugin;

