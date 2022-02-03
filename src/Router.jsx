import React, { Component } from 'react';
import { HashRouter,Route,Switch,Redirect } from 'react-router-dom';
import App from './App';
import Admin from './admin';
import Login from './pages/login';
import Buttons from './pages/ui/Buttons';
import Modals from './pages/ui/Modals';
import NoMatch from './pages/nomatch';
import Loading from './pages/ui/Loading';
import Notice from './pages/ui/Notice';
import Messages from './pages/ui/Messages';
import Tab from './pages/ui/Tab';
import Gallery from './pages/ui/Gallery';
import Carouse from './pages/ui/Carouse';
import FormLogin from './pages/form/Login';
import Register from './pages/form/Register';
import Basic from './pages/table/Basic';
import HighTable from './pages/table/HighTable';
import City from './pages/city/index';
import Order from './pages/order/index';
import Detail from './pages/order/Detail';
import BikeMap from './pages/map/BikeMap';
import Home from './pages/home';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import Rich from './pages/rich';
import PermissionUser from './pages/promiseion';
import Common from './Common';
import User from './pages/user';
export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App> 
                <Switch>
                    <Route path="/common" render={()=>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={Detail} />
                        </Common>
                    } />
                    <Route path="/" render={()=>
                        <Admin>
                            <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/ui/buttons" component={Buttons} />
                            <Route path="/ui/modals" component={Modals} />
                            <Route path="/ui/loadings" component={Loading} />
                            <Route path="/ui/notification" component={Notice} />
                            <Route path="/ui/messages" component={Messages} />
                            <Route path="/ui/tabs" component={Tab} />
                            <Route path="/ui/gallery" component={Gallery} />
                            <Route path="/ui/carousel" component={Carouse} />
                            <Route path="/form/login" component={FormLogin} />
                            <Route path="/form/reg" component={Register} />
                            <Route path="/table/basic" component={Basic} />
                            <Route path="/table/high" component={HighTable} />
                            <Route path="/city" component={City} />
                            <Route path="/order" component={Order} />
                            <Route path="/user" component={User} />
                            <Route path="/bikeMap" component={BikeMap} />
                            <Route path="/charts/bar" component={Bar} />
                            <Route path="/charts/pie" component={Pie} />
                            <Route path="/charts/line" component={Line} />
                            <Route path="/rich" component={Rich} />
                            <Route path="/permission" component={PermissionUser} />
                            <Redirect to="/home"/>
                            <Route  component={NoMatch} />
                            </Switch>
                        </Admin>

                    } />   
                    
                    <Route path="/login" component={Login} />
                    <Route path="/order/detail" component={Login} />

                    </Switch>
                </App>
            </HashRouter>
        )
    }
}
