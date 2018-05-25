import React from 'react';
import {Route, Switch} from 'react-router-dom'
import ContentEvents from './Event/ContentEvents';
import Registration from './User/Registration';

export default class Content extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path='/app/events' component={ContentEvents}/>
                    <Route exact path='/app/users' component={Registration}/>
                </Switch>
            </main>
        );
    }
};