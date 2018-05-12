import React from 'react';
import {Route, Switch} from 'react-router-dom'
import ContentEvents from './Event/ContentEvents';

export default class Content extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path='/app/events' component={ContentEvents}/>
                </Switch>
            </main>
        );
    }
};