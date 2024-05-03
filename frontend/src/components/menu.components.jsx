import React, { useState } from "react";
import { menuItems } from "./menu-links";
import MenuItems from "./menu-items-component";

const MenuComponents = () => {

  return (
    <>
      <ul className="menu flex list-none">
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </>
  );
};

export default MenuComponents;
