import Nav from '../Nav'
import Navitem from '../Navitem'
import Profile from '../Profile'
import Dashboard from './Dashboard'
import {ReactComponent as DashboardIcon} from '../icons/bxs-dashboard.svg';
import {ReactComponent as BusRouteIcon} from '../icons/bx-map-alt.svg';
import {ReactComponent as DriverIcon} from '../icons/bx-user-circle.svg';
const Admin = () => {
    
    
    return ( 
        <div id = "adm">
            <header id="adm-header">
                    <h3>Dokobus <span>Admin Panel</span></h3>
                    <Profile />
            </header>
            <div id="adm-container">                
                <aside id="side-nav">
                    <Nav id = "adm-nav">
                        <Navitem icon = {<DashboardIcon/>} linkName = "Dashboard"/>
                        <Navitem active = {true} icon = {<BusRouteIcon/>} linkName = "Bus Route"/>
                        <Navitem icon = {<DriverIcon/>} linkName = "Driver"/>
                    </Nav>
                </aside>
                <main id="adm-content">
                    <Dashboard />
                </main>
            </div>
            
        </div>
     );
}
 

 
export default Admin;