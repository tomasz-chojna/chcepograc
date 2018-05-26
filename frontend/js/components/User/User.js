import React from 'react';
import RelatedEvents from "./RelatedEvents";

export default class User extends React.Component {
    state = {
        user: null,
        eventsOrganized: [],
        eventsParticipated: [],
    };

    componentDidMount() {
        this.fetchUser(this.props.match.params.id);
        this.fetchEventsOrganized();
        this.fetchEventsParticipated();
    }

    fetchUser = (userId) => {
        const self = this;
        fetch(`/api/users/${userId}`, {
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'include'
        })
            .then(res => res.json())
            .then((user) => ({'user': user}), this.onAjaxError)
            .then((newState) => this.setState(newState))
    }

    fetchEventsOrganized = () => this.fetchEventsRelated('organized');
    fetchEventsParticipated = () => this.fetchEventsRelated('participated');

    fetchEventsRelated = (type) => {
        fetch(`/api/users/${this.props.match.params.id}/events/${type}`, {
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'include'
        })
            .then(res => res.json())
            .then((events) => {
                const typeCamel = type[0].toUpperCase() + type.slice(1);
                let state = {};
                state[`events${typeCamel}`] = events

                return state;
            }, this.onAjaxError)
            .then((newState) => this.setState(newState))
    }

    onAjaxError = (error) => ({
        ajaxStatus: {
            isLoaded: true,
            success: false,
            error
        }
    })

    render() {
        if (this.state.user == null) {
            return (
                <div>Ładowanie danych...</div>
            )
        }
        return (
            <div className="my-3 p-3 bg-white rounded box-shadow">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="mb-0">{this.state.user.firstName} {this.state.user.lastName}</h2>
                        <span className="text-muted">{this.state.user.phone}, {this.state.user.email}</span>
                        <div className="row mt-3">
                            <div className="col-md-6 mb-3">
                                <h4>Jest uczestnikiem w:</h4>
                                <RelatedEvents events={this.state.eventsParticipated}/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <h4>Organizowane wydarzenia:</h4>
                                <RelatedEvents events={this.state.eventsOrganized}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}