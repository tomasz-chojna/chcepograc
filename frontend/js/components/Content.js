import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Events from './Event/Events';

export default class Content extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path='/events' component={Events}/>
                    {/*<Route exact path='/login' component={Login}/>*/}
                </Switch>
            </main>
        );
    }
};