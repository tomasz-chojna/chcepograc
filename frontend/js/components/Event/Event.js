import React from 'react';
import EventAPI from '../../api/EventAPI'

export default function Event(props) {
    const event = EventAPI.get(
        parseInt(props.match.params.number, 10)
    )
    if (!event) {
        return <div>Sorry, but the event was not found</div>
    }
    return (
        <div>
            <h1>{event.id} (#{event.some})</h1>
            <h2>LOL</h2>
        </div>
    )
}