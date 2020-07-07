import React from "react";

function NavbarItem({render, ...props}) { //Maybe I could only use: function NavbarItem(props) { ... }

    if(render){ //Maybe I could only use: if(props.render){...}
        return(
            <li className="nav-item">
                <a onClick={props.onClick} className="nav-link" href={props.href}>{props.label}</a>
            </li>
        )
    } else {
        return false; //do not render the component
    }

}

export default NavbarItem;