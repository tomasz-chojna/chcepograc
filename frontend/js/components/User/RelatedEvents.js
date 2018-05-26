import React from 'react';
import {Link} from "react-router-dom";

export default class RelatedEvents extends React.Component {
    state = {
        events: []
        // events: this.props.events
    };
    componentWillReceiveProps = (nextProps) => this.setState({
        events: nextProps.events
    });

    render() {
        if (!this.state.events) return (
            <div>Ładowanie danych...</div>
        );
        return (<x>
            {this.state.events.map(event => (
                <div className="media text-muted pt-3 border-bottom border-gray" key={event.id}>
                    <img
                        src="http://i6.offers.gallery/p-96-89-9689e537492ded0fa75fac3765193c3b200x200/siatkowka-pilka-siatkarska-spokey-play-ii-zolty-5902693200888.jpg"
                        alt="" className="mr-2 rounded" width="48" height="48"/>

                    <p className="media-body pb-3 mb-0 small lh-125 event-info">
                        <strong className="d-block text-gray-dark mb-1">
                            <Link to={`/app/events/${event.id}`}>{event.name}</Link>
                        </strong>

                        <span><i className="fa fa-clock"></i> {event.startTime}</span>
                        <span><i className="fa fa-map-marker"></i> {event.place}</span>
                        <span className="text-success"><i className="fa fa-users"></i> {event.maxParticipants}</span>
                        <span><i className="fa fa-star"></i> {event.skillLevel}</span>
                        <span><i className="fa fa-money-bill-alt"></i> {event.price} PLN</span>
                    </p>
                </div>
            ))}
        </x>)
    }
}