import React from 'react';
import EventParticipants from "./EventParticipants";

export default class Event extends React.Component {
    constructor(props) {
        super(props);
        this.props = props

        this.state = {
            isLoaded: false,
            event: null
        }

        // this.event = EventAPI.get(
        //     parseInt(props.match.params.id, 10)
        // )
    }

    componentDidMount() {
        fetch(`/api/events/${this.props.match.params.id}`)
            .then(res => res.json())
            .then((result) => ({
                    isLoaded: true,
                    event: result
                }),
                (error) => ({
                    isLoaded: true,
                    error
                })
            ).then((newState) => this.setState(newState))
    }

    render() {
        const event = this.state.event;

        if (!this.state.isLoaded) {
            if (!event) {
                return <div>Nie znaleziono wydarzenia.</div>
            }
            return <div>Ładowanie...</div>
        }

        return (
            <div className="my-3 p-3 bg-white rounded box-shadow">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="mb-0">({event.eventType.name}) {event.name}</h2>
                        <span className="text-muted">{event.place}</span>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <h4>Specyfika</h4>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item border-bottom"><i className="fa fa-arrow-up"></i>Wymagany
                                        poziom: {event.skillLevel}
                                    </li>
                                    <li className="list-group-item border-bottom"><i className="fa fa-users"></i>
                                        Zajęte miejsca: {event.participants.length} / {event.maxParticipants}
                                    </li>
                                    <li className="list-group-item border-bottom"><i className="fa fa-calendar-alt"></i>
                                        Termin: {event.startTime}
                                    </li>
                                    <li className="list-group-item border-bottom"><i
                                        className="fa fa-money-bill-alt"></i>Koszt uczestnictwa: {event.price}
                                    </li>
                                    <li className="list-group-item border-bottom"><i className="fa fa-asterisk"></i>
                                        {event.description.split('\n').map((item, key) => {
                                            return <span key={key}>{item}<br/></span>
                                        })}
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6 mb-3">
                                <EventParticipants event={event}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}