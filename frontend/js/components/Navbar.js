import React from 'react';
import {Link} from "react-router-dom";

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light container">

                <a className="navbar-brand" href="#">
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
                        <li className="nav-item">
                            <Link to='/events' className="nav-link" >Wydarzenia <span
                                className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/events/create' className="nav-link" >Zorganizuj</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="login">Zaloguj się</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Szukaj" aria-label="Szukaj"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Szukaj</button>
                    </form>
                </div>
            </nav>
        );
    }
}