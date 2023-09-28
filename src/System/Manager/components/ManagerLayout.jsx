import "../../../assets/layout.css";

import { Layout, Grid, Drawer, Dropdown, Avatar } from "antd";
import React, { useContext, useEffect, useState } from "react";
import SidebarNavs from "./SidebarNavs";
import { AuthContext } from "../../../context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Redirect from "../../../utils/Redirect";
import { AiOutlineMenu } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { BsPersonFillGear } from "react-icons/bs";
import UpdateProfileComponent from "../../components/UpdateProfileComponent";

const { Content, Header, Sider } = Layout;
const { useBreakpoint } = Grid;

const ManagerLayout = ({ children }) => {
  const breakpoints = useBreakpoint();
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [openProfile, setOpenProfile] = useState(false)
  const router = useNavigate();
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (auth && auth?.token) {
      getCurrentAdmin();
    }
  }, []);

  const getCurrentAdmin = async () => {
    try {
      const { data } = await axios.get(`http://localhost:9000/api/current-manager`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.ok) {
        setLoading(false);
      }
    } catch (err) {
      console.log(err, "from heere");
      router("/");
    }
  };

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

  return (
    <Layout style={{ minHeight: "100vh" }}>

      {/* sidebar for just md large screens */}
      {breakpoints.md && (
        <div >
          <Sider
            style={{
              height: "100%",
              background: "linear-gradient(45deg, #0b3d91, #000000)",
            }}
          >
            <h5 className="menu-heading mt-2 text-center" style={{fontSize: '18px', color: 'white', textAlign: 'center'}}>Ticketing System</h5> 
            <SidebarNavs />
          </Sider>
        </div>
      )}
      {/* end */}

      <Layout>
        {/* headers */}
        <Header
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            alignItems: "center",
            padding: "20px",
          }}
        >
          {!breakpoints.md && (
            <div onClick={() => setOpen(true)}>
              {" "}
              <AiOutlineMenu />
            </div>
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
              {auth.user.name[0].toUpperCase()}
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
        <Content
          style={{
            minHeight: "80vh",
            margin: "20px",
            marginTop: "20px",
            padding: "20px",
            // background: "white",
          }}
        >
          {loading ? <Redirect /> : children}
        </Content>
      </Layout>

      <UpdateProfileComponent open={openProfile} setOpen={setOpenProfile} auth={auth}/>
    </Layout>
  );
};

export default ManagerLayout;
