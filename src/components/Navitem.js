const Navitem  = ({icon, linkName,active}) => {
    return ( 
        <li>
            <a href="#" className = {`nav-link ${active ? "nav-link-active" :"" }`} data-link-name = {linkName}>
                <i>
                    {icon}
                </i>
                <span>
                    {linkName}
                </span>
            </a>
        </li>
    );
}
export default Navitem