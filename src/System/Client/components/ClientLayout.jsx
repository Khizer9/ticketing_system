import "../../../assets/layout.css";

import { Layout, Grid, Drawer, Dropdown, Avatar } from "antd";
import React, { useContext, useEffect, useState } from "react";
import SidebarNavs from "./SidebarNavs";
import { AuthContext } from "../../../context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoLogOutOutline } from "react-icons/io5";
import { BsPersonFillGear } from "react-icons/bs";
import UpdateProfileComponent from "../../components/UpdateProfileComponent";
import Redirect from "../../../utils/Redirect";
import { AiOutlineMenu } from "react-icons/ai";

const { Content, Header, Sider } = Layout;
const { useBreakpoint } = Grid;

const ClientLayout = ({ children }) => {
  const breakpoints = useBreakpoint();
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [openProfile, setOpenProfile] = useState(false)
  const router = useNavigate();

  const items = [
    {
      key: "1",
      label: <span>Profile</span>,
      icon: <BsPersonFillGear className="icon-header" />,
      onClick: () => setOpenProfile(true),
    },
    {
      key: "2",
      label: <span>Logout</span>,
      icon: <IoLogOutOutline className="icon-header" />,
      onClick: () => {
        localStorage.clear();
        setAuth({});
        router("/");
      },
    },
  ];


  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (auth && auth?.token) {
      getCurrentClient();
    }
  }, []);

  const getCurrentClient = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:9000/api/current-client`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log(data, "from client layout");
      if (data.ok) {
        setLoading(false);
      }
    } catch (err) {
      console.log(err, "from heere");
      router("/");
    }
  };



  return (
    <Layout>
      {/* sidebar */}
      {breakpoints.md && (
        <div style={{ height: "100vh" }}>
          <Sider
            style={{
              height: "100%",
            }}
          >
            <SidebarNavs />
          </Sider>
        </div>
      )}

      {/* ------- */}

      {/* layout start */}
      <Layout>

      
        {/* header */}
        <Header
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            padding: "20px",
          }}
        >
          {!breakpoints.md && (
            <span onClick={() => setOpen(true)}>
              <AiOutlineMenu />
            </span>
          )}

          <h6>Welcome {auth?.user?.name}</h6>

          <Dropdown menu={{ items }}>
            <Avatar
              style={{
                background: "linear-gradient(45deg, #0b3d91, #000000)",
                color: "white",
                cursor: 'pointer'
              }}
            >
              {auth?.user?.name[0]}
            </Avatar>
          </Dropdown>

          <Drawer
            placement="left"
            onClose={onClose}
            open={open}
            closable={true}
            style={{ width: "280px", background : "linear-gradient(45deg, #0b3d91, #000000)"}}
          >
            <SidebarNavs />
          </Drawer>
        </Header>

        {/* content */}
        <Content>{loading ? <Redirect /> : children}</Content>
        {/* <Content>{children}</Content> */}
      </Layout>
      {/* --------- */}

      <UpdateProfileComponent open={openProfile} setOpen={setOpenProfile} auth={auth} />
    </Layout>
  );
};

export default ClientLayout;
