import React from "react";
import { slide as Menu } from "react-burger-menu";

export default props => {
    return (
        // Pass on our props
        <Menu crossButtonClassName={ "burger-menu" } {...props}>
            <a className="menu-item" href="/j7r2ycpnu8k">
                Đếm sao
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