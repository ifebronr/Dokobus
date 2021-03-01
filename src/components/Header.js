import {ReactComponent as HomeIcon} from './icons/bx-home.svg';
import {ReactComponent as RequestIcon} from './icons/bx-location-plus.svg';
import {ReactComponent as SearchIcon} from './icons/bx-search.svg';


const Header = () => {
    

    return (  
    <header id="cd-header">
       <Nav>
           <Navitem icon = {<HomeIcon/>} linkName = "Home" />
           <Navitem icon = {<RequestIcon/>} linkName = "Request Stops" />
           <Navitem icon = {<SearchIcon/>} linkName = "Search" />
       </Nav>
       <Profile></Profile>
    </header>
    );
}

const Nav = (props) => {
    return ( 
        <nav id="cd-nav">  
            <ul id="cd-nav-items">
                {props.children}
            </ul>
        </nav>
     );
}

const Navitem  = (props) => {
    return ( 
        <li>
            <a href="/" className = "nav-link" data-link-name = {props.linkName}>
                <i className = "icon-btn">
                    {props.icon}
                </i>
            </a>
        </li>
    );
}
 
const Profile = (props) => {
    return (
        <div className = "profile"></div>
      );
}
 

 
export default Header;