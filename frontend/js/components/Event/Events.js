import React from 'react';
import {Route, Switch} from 'react-router-dom'
import EventCreate from './EventCreate';
import EventsList from './EventsList';

export default class Events extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/events' component={EventsList}/>
                    {/*<Route path='/events/:id' component={Event}/>*/}
                    <Route path='/events/create' component={EventCreate}/>
                </Switch>
            </main>
        )
    }
}