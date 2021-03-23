import {Link,useRouteMatch} from 'react-router-dom'
const Navitem  = ({to,icon, linkName}) => {
    const match = useRouteMatch({
        path: to,
        exact:true,
      });
    return ( 
        <li>
            <Link to = {to} className = {`nav-link ${match ? "nav-link-active" :"" }`} data-link-name = {linkName}>
                <i>
                    {icon}
                </i>
                <span>
                    {linkName}
                </span>
            </Link>
        </li>
    );
}
export default Navitem