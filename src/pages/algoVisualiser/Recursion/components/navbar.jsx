import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <Link to={"/"}>
                        <span style={{ color: "white" }}>
                            Home
                        </span>
                    </Link>
                </div>

            </nav>
        );
    }
}

export default Navbar;