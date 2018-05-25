import React from 'react';
import {Redirect} from "react-router-dom";

export default class Registration extends React.Component {

    state = {
        registered: false
    };

    constructor(props) {
        super(props);
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.phone = React.createRef();
        this.email = React.createRef();
        this.password = React.createRef();
    }

    onSubmit(e) {
        e.preventDefault();

        fetch(`/api/users/new`, {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                firstName: this.firstName.value,
                lastName: this.lastName.value,
                phone: this.phone.value,
                email: this.email.value,
                password: this.password.value
            })
        }).then(response => response.json()).then(response => {
            this.setState({registered: true});
        });
    }

    render() {
        if (this.state.registered) {
            return <Redirect to="/app/events" />;
        }

        return <div className="container">
            <div className="loginbox text-center">
                <form className="form-signin" method="post" onSubmit={(e) => this.onSubmit(e)}>
                    <img className="mb-4" src="img/run.svg" alt="" width="72" height="72"/>

                    <h1 className="h3 mb-3 font-weight-normal">Nowe konto</h1>

                    <div className="form-group">
                        <label for="first_name" className="sr-only">Imię</label>
                        <input ref={input => this.firstName = input} type="text" id="first_name" name="first_name" className="form-control"
                               placeholder="Imię" required autofocus/>
                    </div>

                    <div className="form-group">
                        <label for="last_name" className="sr-only">Nazwisko</label>
                        <input ref={input => this.lastName = input} type="text" id="last_name" name="last_name" className="form-control"
                               placeholder="Nazwisko" required autofocus/>
                    </div>

                    <div className="form-group">
                        <label for="last_name" className="sr-only">Nr telefonu</label>
                        <input ref={input => this.phone = input} type="text" id="phone" name="phone" className="form-control"
                               placeholder="Nr telefonu" required autofocus/>
                    </div>

                    <div className="form-group">
                        <label for="email" className="sr-only">Adres e-mail</label>
                        <input ref={input => this.email = input} type="email" id="email" name="email" className="form-control"
                               placeholder="Email" required autofocus/>
                    </div>

                    <div className="form-group">
                        <label for="password" className="sr-only">Hasło</label>
                        <input ref={input => this.password = input} type="password" id="password" name="password" className="form-control"
                               placeholder="Hasło" required/>
                    </div>

                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={(e) => this.onSubmit(e)}>
                        Załóż konto
                    </button>
                </form>
            </div>
        </div>
    }
}