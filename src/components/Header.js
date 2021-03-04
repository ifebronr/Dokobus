import {ReactComponent as HomeIcon} from './icons/bx-home.svg';
import {ReactComponent as RequestIcon} from './icons/bx-location-plus.svg';
import {ReactComponent as SearchIcon} from './icons/bx-search.svg';
import Nav from './Nav'
import Navitem from './Navitem'
import IconBtn from './IconBtn'
import Profile from './Profile'

const Header = ({id}) => {
    

    return (  
    <header id ={id}>
       <Nav id = "cd-nav">
           <IconBtn icon = {<HomeIcon/>} linkName = "Home" />
           <IconBtn icon = {<RequestIcon/>} linkName = "Request Stops" />
           <IconBtn icon = {<SearchIcon/>} linkName = "Search" />
       </Nav>
       <Profile />
    </header>
    );
}


 
export default Header;