import "../../../assets/layout.css";

import { Layout, Grid, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import SidebarNavs from "./SidebarNavs";
import { AuthContext } from "../../../context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Redirect from "../../../utils/Redirect";

const { Content, Header, Sider } = Layout;
const { useBreakpoint } = Grid;

const AgentLayout = ({ children }) => {
  const breakpoint = useBreakpoint();
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const router = useNavigate();

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
        `http://localhost:9000/api/current-admin`,
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
      {breakpoint.md && (
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
          {!breakpoint.md && (
            <span onClick={() => setOpen(true)}>
              button that will open menu for mobile
            </span>
          )}
          <span>profile</span>

          <Drawer
            title="Basic Drawer"
            placement="left"
            onClose={onClose}
            open={open}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </Header>

        {/* content */}
        {/* <Content>{loading ? <Redirect /> : children}</Content> */}
        <Content>{children}</Content>
      </Layout>
      {/* --------- */}
    </Layout>
  );
};

export default AgentLayout;
