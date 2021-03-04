const Nav = ({id,children}) => {
    return ( 
        <nav id={id}>  
            <ul id={`${id}-items`}>
                {children}
            </ul>
        </nav>
     );
}
export default Nav;