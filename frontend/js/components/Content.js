import React from 'react';
import {Route, Switch} from 'react-router-dom'
import ContentEvents from './Event/ContentEvents';

export default class Content extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path='/events' component={ContentEvents}/>
                    {/*<Route exact path='/login' component={Login}/>*/}
                </Switch>
            </main>
        );
    }
};