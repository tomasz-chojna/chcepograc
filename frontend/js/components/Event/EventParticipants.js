import React from 'react';
import {Link} from "react-router-dom";
// todo: component Button nie chce działać
// import Button from 'react-uikit-button';

export default class EventParticipants extends React.Component {
    state = {
        loggedUser: null,
        participants: this.props.event.participants,
        userParticipating: false,
        joiningAvailable: false
    };

    componentDidMount() {
        this.setState({
            joiningAvailable: this.isJoiningAvailable()
        });
        this.getAuthorization();
    }

    getAuthorization = () => {
        fetch(`/api/users/me`, {
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(
                (user) => ({
                    loggedUser: user,
                    userParticipating: this.isUserParticipating(user.id),
                }),
                (error) => ({
                    ajaxStatus: {
                        isLoaded: true,
                        success: false,
                        error
                    }
                })
            )
            .then((newState) => this.setState(newState))
    }

    isUserParticipating = (userId) => {
        return this.state.participants.reduce((found, user) => {
            if (found) return true;
            return user.id === userId;
        }, this.state.userParticipating);
    }

    isJoiningAvailable = () => {
        return this.state.joiningAvailable || this.freeSeatsAvailable();
    }

    freeSeatsAvailable = () => (this.state.participants.length < this.props.event.maxParticipants)

    updateJoiningAvailable = () => {
        this.setState({joiningAvailable: this.freeSeatsAvailable()});
    }

    // https://michalzalecki.com/react-components-and-class-properties/#bounded-methods
    eventJoinHandler = () => {
        fetch(`/api/events/${this.props.event.id}/join`, {
            method: "POST",
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'include'
        })
            .then(res => res.json())
            .then((user) => ({
                    participants: [...this.state.participants, user],
                    userParticipating: true
                }),
                (error) => ({
                    ajaxStatus: {
                        isLoaded: true,
                        success: false,
                        error
                    }
                })
            )
            .then((newState) => this.setState(newState))
            .then(() => this.updateJoiningAvailable())
    }

    eventRevokeHandler = () => {
        fetch(`/api/events/${this.props.event.id}/revoke`, {
            method: "DELETE",
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'include',
        })
            .then(res => res.json())
            .then((user) => ({
                    participants: this.state.participants.filter((participant) => participant.id !== user.id),
                    userParticipating: false
                }),
                (error) => ({
                    ajaxStatus: {
                        isLoaded: true,
                        success: false,
                        error
                    }
                })
            )
            .then((newState) => this.setState(newState))
            .then(() => this.updateJoiningAvailable())
    }

    render() {
        const joinButton = (
            <button
                className="btn btn-outline-success my-2 my-sm-0"
                style={{'margin-left': '20px'}}
                onClick={this.eventJoinHandler}
            >Dołącz +</button>
        );
        const revokeButton = (
            <button
                className="btn btn-outline-danger my-2 my-sm-0"
                style={{'margin-left': '20px'}}
                onClick={this.eventRevokeHandler}
            >Wypisz się</button>
        );
        return (
            <div>
                <h4>Uczestnicy
                    {this.state.joiningAvailable
                        ? (!this.state.userParticipating ? joinButton : revokeButton)
                        : (!this.state.userParticipating ? '': revokeButton)
                    }
                </h4>
                {this.state.participants.length > 0
                    ? (
                        <ul className="list-group list-group-flush">
                            {this.state.participants.map(participant => (
                                <li className="list-group-item">
                                    <Link to={`/app/users/${participant.id}`}>{participant.firstName} {participant.lastName}</Link>
                                </li>
                            ))}
                        </ul>
                    )
                    : (<div>Brak czestników</div>)
                }
            </div>
        )
    }
}