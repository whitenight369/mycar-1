import React, { Component } from 'react';
import { HashRouter,Route,Switch } from 'react-router-dom';
import App from './App';
import Admin from './admin';
import Login from './pages/login';
import Buttons from './pages/ui/Buttons';
import Modals from './pages/ui/Modals';
import NoMatch from './pages/nomatch';
import Loading from './pages/ui/Loading';
import Notice from './pages/ui/Notice';
import Message from './pages/ui/Message';
import Tab from './pages/ui/Tab';
import Gallery from './pages/ui/Gallery';
import Carouse from './pages/ui/Carouse';
import FormLogin from './pages/form/Login';
import Register from './pages/form/Register';
import Basic from './pages/table/Basic';
import HighTable from './pages/table/HighTable';
import City from './pages/city/index';
export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/" render={()=>
                        <Admin>
                            <Switch>
                            <Route path="/ui/buttons" component={Buttons} />
                            <Route path="/ui/modals" component={Modals} />
                            <Route path="/ui/loadings" component={Loading} />
                            <Route path="/ui/notification" component={Notice} />
                            <Route path="/ui/message" component={Message} />
                            <Route path="/ui/tabs" component={Tab} />
                            <Route path="/ui/gallery" component={Gallery} />
                            <Route path="/ui/carousel" component={Carouse} />
                            <Route path="/form/login" component={FormLogin} />
                            <Route path="/form/reg" component={Register} />
                            <Route path="/table/basic" component={Basic} />
                            <Route path="/table/high" component={HighTable} />
                            <Route path="/city" component={City} />
                            <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />   
                    <Route path="/login" component={Login} />
                    <Route path="/order/detail" component={Login} />
                </App>
            </HashRouter>
        )
    }
}
