import React from "react";
import { slide as Menu } from "react-burger-menu";

export default props => {
    return (
        // Pass on our props
        <Menu {...props}>
            <a className="menu-item" href="/j7r2ycpnu8k">
                Song 1
      </a>

            <a className="menu-item" href="/8Y2T3SOlbmg">
                Song 2
      </a>

            <a className="menu-item" href="/pizzas">
                Song 3
      </a>

            <a className="menu-item" href="/desserts">
                Song 4
      </a>
        </Menu>
    );
};