import Nav from '../Nav';
import Navitem from '../Navitem';
import Profile from '../Profile';
import Maps from '../Maps';
import AdmContent from './AdmContent';
import BusRoute from './BusRoute';
import Driver from './Driver';
import {BrowserRouter as Router,Route,Switch, useHistory} from 'react-router-dom';
import {ReactComponent as DashboardIcon} from '../icons/bxs-dashboard.svg';
import {ReactComponent as BusRouteIcon} from '../icons/bx-map-alt.svg';
import {ReactComponent as DriverIcon} from '../icons/bx-user-circle.svg';
import firebase from "../firebase";


const Admin = () => {
    const history = useHistory();
    if(!firebase.getCurrentUser()){
        history.replace('/login');
        return null
    }
    return ( 
        <div id = "adm">
            <header id="adm-header">
                    <h3>Dokobus <span>Admin Panel</span></h3>
                    <Profile user = {firebase.getCurrentUser()} />
            </header>
            <div id="adm-container">                
                <Router>
                    <aside id="side-nav">
                        <Nav id = "adm-nav">
                            <Navitem to = '/admin' icon = {<DashboardIcon/>} linkName = "Dashboard" />
                            <Navitem to = '/admin/bus' icon = {<BusRouteIcon/>} linkName = "Bus Route"/>
                            <Navitem to = '/admin/driver' icon = {<DriverIcon/>} linkName = "Driver"/>
                        </Nav>
                    </aside>
                    <main id="adm-content">
                        <Switch> 
                            <Route exact path = "/admin" >
                                <AdmContent title = "Dashboard" >
                                    <div>
                                        <Maps width = "100%" height = "500px"/>
                                    </div>
                                </AdmContent>
                            </Route>
                            <Route exact path = "/admin/bus" >
                                <BusRoute/> 
                            </Route>
                            <Route exact path = "/admin/driver" >
                                <Driver/> 
                            </Route>
                        </Switch>
                    </main>
                </Router>
            </div>
        </div>
     );
}
 
export default Admin;