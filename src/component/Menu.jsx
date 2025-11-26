
import React from "react"
import { Link } from "react-router-dom"

const Menu = (props) => {

    return (

        <div>

            <Link to={props.path}>{props.name}</Link>

        </div>


    )

}

export default Menu;