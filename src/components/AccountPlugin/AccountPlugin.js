import React, { Component } from "react";
import { Button, Dropdown, DropdownToggle, Badge } from 'reactstrap';

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
                        </div>
                    </li>
                    <li className="adjustments-line">
                        <div id="MetMaskWallet">
                            {

                            }
                        </div>
                    </li>
                    <li className="header-title">Account Details</li>
                    <li>
                        
                    </li>
                    <li>
                        Public Key: 
                    </li>
                    <li></li>
                </ul>
            </Dropdown>
        </div>
    );
}

export default AccountPlugin;

