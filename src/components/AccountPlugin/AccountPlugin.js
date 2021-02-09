import React, { Component } from "react";
import Account from '../Account/Account';
import UserProfile from '../../views/UserProfile';

class AccountPlugin extends Component {

    toggle = () => {
        const accountPopup = document.getElementById("account");
        accountPopup.classList.contains("show") ?
        accountPopup.classList.remove("show") :
        accountPopup.classList.add("show");
    }
    render() {
        return (
            <div className="fixed-plugin">
                <div id="account" className="dropdown show-dropdown">
                    <div onClick={this.toggle}>
                    <i className="fa fa-address-book fa-4x"></i>
                    </div>
                    <div className="dropdown-menu show">
                        <Account />
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountPlugin;