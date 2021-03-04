const IconBtn = ({icon,linkName}) => {
    return ( 
        <button  className = "btn icon-btn" data-link-name = {linkName}>
           {icon}
        </button>
     );
}
 
export default IconBtn;