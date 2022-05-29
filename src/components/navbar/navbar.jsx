import './navbar.css';
import React from "react";
import Button from "../button/button";

function NavBar() {
    return (
        <div className={"navbar"}>
            <div className={"brand"}>
                <p>
                    My Logo
                </p>
            </div>
            <div className={"navbar-items"}>
                <div className={"navbar-links"}>
                    <a className={"navbar-link"}>
                        Documentation
                    </a>
                    <a className={"navbar-link"}>
                        Academy
                    </a>
                    <a className={"navbar-link"}>
                        Contact Us
                    </a>
                    <a className={"navbar-link"}>
                        About Us
                    </a>
                </div>
                <div className={"navbar-button"}>
                    <Button text={"Login"} />
                </div>
            </div>
        </div>
    );
}

export default NavBar;
