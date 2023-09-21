import { Menu } from "antd";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { PiUsersLight } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";

const SideNavs = () => {
  const router = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <Menu
      theme="dark"
      style={{
        backgroundColor: "transparent",
      }}
      defaultSelectedKeys={["1"]}
      mode="inline"
    >
      <Menu.Item onClick={()=>router('/admin')} className={`${pathname === "/admin" ? 'sidebar-navs-active' : 'sidebar-navs'}`} icon={<MdOutlineDashboard />}>
        Dashboard
      </Menu.Item>
      <Menu.Item
        onClick={() => router("/admin/all-users")}
        className={`${pathname === "/admin/all-users" ? 'sidebar-navs-active' : 'sidebar-navs'}`}
        icon={<PiUsersLight />}
      >
        All Users
      </Menu.Item>
      <Menu.Item className={`${pathname === "" ? 'sidebar-navs-active' : 'sidebar-navs'}`}>Agents</Menu.Item>
      <Menu.Item className={`${pathname === "" ? 'sidebar-navs-active' : 'sidebar-navs'}`}>Clients</Menu.Item>
    </Menu>
  );
};

export default SideNavs;