import React from 'react';
import {Link} from "react-router-dom";

export default class EventsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            events: []
        };
    }

    componentDidMount() {
        fetch("/api/events/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        events: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, events} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {events.map(event => (
                        <li key={event.id}>
                            <Link to={`/events/${event.id}`}>{event.name}</Link><br/>
                            Cena: {event.price}, Miejsce: {event.place}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}