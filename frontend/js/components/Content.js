import React from 'react';
import {Route, Switch} from 'react-router-dom'
import ContentEvents from './Event/ContentEvents';
import ContentUsers from './User/ContentUsers';
import Registration from './User/Registration';

export default class Content extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path='/app/events' component={ContentEvents}/>
                    <Route exact path='/app/users' component={Registration}/>
                    <Route path='/app/users' component={ContentUsers}/>
                </Switch>
            </main>
        );
    }
};