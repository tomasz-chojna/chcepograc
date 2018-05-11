import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Event from './Event';
import EventCreate from './EventCreate';
import EventsList from './EventsList';

export default class ContentEvents extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/events' component={EventsList}/>
                <Route path='/events/create' component={EventCreate}/>
                <Route path='/events/:id' component={Event}/>
            </Switch>
        )
    }
}