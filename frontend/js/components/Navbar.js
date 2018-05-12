import React from 'react';
import {Link} from "react-router-dom";

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light container">

                <a className="navbar-brand" href="/app/events">
                    <img src="img/run.svg" width="30" height="30" className="d-inline-block align-top" alt=""/>
                    Chcę Pograć!
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={window.location.pathname === '/app/events' ? "nav-item active" : "nav-item"}>
                            <Link to='/app/events' className="nav-link" >Wydarzenia <span
                                className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className={window.location.pathname === '/app/events/create' ? "nav-item active" : "nav-item"}>
                            <Link to='/app/events/create' className="nav-link" >Zorganizuj</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Zaloguj się</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}