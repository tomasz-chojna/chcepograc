import React from 'react';
import {Link} from "react-router-dom";

export default class Navbar extends React.Component {

    state = {
        loggedUser: null,
    };

    componentDidMount() {
        fetch(`/api/users/me`, {
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(
                (user) => ({
                    loggedUser: user,
                }),
                () => ({
                    loggedUser: null
                })
            )
            .then((newState) => this.setState(newState))
    }

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
                        {this.state.loggedUser
                            ? <li className="nav-item">
                                <a className="nav-link" href="/logout">Wyloguj się</a>
                            </li>
                            : <li className="nav-item">
                                <a className="nav-link" href="/login">Zaloguj się</a>
                            </li>
                        }

                    </ul>
                </div>

                {this.state.loggedUser ? <span>{this.state.loggedUser.email}</span> : null}
            </nav>
        );
    }
}