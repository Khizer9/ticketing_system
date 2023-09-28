import { Menu } from "antd";
import React from "react";

import bg from "../../../assets/bg.jpeg";
import { MdOutlineDashboard } from "react-icons/md";

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
        <h5 className="text-light" style={{ color: 'white',fontSize: '18px',textAlign: 'center',marginTop: '50px' }}>
          Ticketing System
        </h5>
      </div>
      <Menu.Item className="sidebar-navs" icon={<MdOutlineDashboard />}>
        Dashboard
      </Menu.Item>
      <Menu.Item className="sidebar-navs">Managers</Menu.Item>
      <Menu.Item className="sidebar-navs">Agents</Menu.Item>
      <Menu.Item className="sidebar-navs">Clients</Menu.Item>
    </Menu>
  );
};

export default SidebarNavs;
