import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from '../Main';
import Details from '../Details';

const Body = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route exact path="/details/:id" component={Details}/>
                <Route path="/">
                    <Redirect to="/"/>
                </Route>
            </Switch>
        </div>
    );
};

export default Body;