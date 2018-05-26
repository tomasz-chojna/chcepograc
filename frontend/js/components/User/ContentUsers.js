import React from 'react';
import {Route, Switch} from 'react-router-dom'
import User from './User';

export default class ContentUsers extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/app/users/:id' component={User}/>
            </Switch>
        )
    }
}