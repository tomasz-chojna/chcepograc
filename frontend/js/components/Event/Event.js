import React from 'react';

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
        fetch(`/api/events/${parseInt(this.props.match.params.id, 10)}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        event: result
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
        const event = this.state.event;

        if (!event) {
            return <div>Sorry, but the event was not found</div>
        }

        return (
            <div className="my-3 p-3 bg-white rounded box-shadow">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="mb-0">{event.name}</h2>
                        <span className="text-muted">{event.place}</span>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <h4>Specyfika</h4>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item border-bottom"><i className="fa fa-arrow-up"></i>Wymagany
                                        poziom: Średnio zaawansowany
                                    </li>
                                    <li className="list-group-item border-bottom"><i className="fa fa-users"></i>Wolne
                                        miejsca: {event.maxParticipants}
                                    </li>
                                    <li className="list-group-item border-bottom"><i className="fa fa-clock"></i>Czas
                                        trwania: 1.5h
                                    </li>
                                    <li className="list-group-item border-bottom"><i className="fa fa-calendar-alt"></i>Termin: {event.startTime}
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
                                <h4>Uczestnicy</h4>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Adam Kowalski (Mock)</li>
                                    <li className="list-group-item">Piotr Rozmarynowski (Mock)</li>
                                    <li className="list-group-item">Tomasz Chojna (Mock)</li>
                                    <li className="list-group-item">Alicja Konieczna (Mock)</li>
                                    <li className="list-group-item">Józef Ziomek (Mock)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}