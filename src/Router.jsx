import React, { Component } from 'react'
import { HashRouter,Route,Switch } from 'react-router-dom';
import App from './App';
import Admin from './admin';
import Login from './pages/login'
import Buttons from './pages/ui/Buttons';
import NoMatch from './pages/nomatch'
export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/" render={()=>
                        <Admin>
                            <Route path="/ui/buttons" component={Buttons} />
                            <Route component={NoMatch} />
                        </Admin>
                    } />   
                    <Route path="/login" component={Login} />
                    <Route path="/order/detail" component={Login} />
                </App>
            </HashRouter>
        )
    }
}
