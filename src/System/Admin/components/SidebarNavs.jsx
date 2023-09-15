import { Menu } from "antd";
import React from "react";

import bg from "../../../assets/bg.jpeg";

import { BiHome } from "react-icons/bi";

const SidebarNavs = () => {
  return (
    <Menu
      style={{
        background: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
      }}
    >
      <div
        className="mt-4 mb-4 text-center p-2"
        style={{ borderRadius: "5px", backgroundColor: "#21375b66" }}
      >
        <h5 className="text-light" style={{ color: "#bb8c00 !important" }}>
          Ticketing System
        </h5>
      </div>
      <Menu.Item
        className="sidebar-navs "
        icon={<BiHome />}
        style={{ color: "#c49507 ", backgroundColor: "transparent" }}
      >
        Home
      </Menu.Item>
    </Menu>
  );
};

export default SidebarNavs;
