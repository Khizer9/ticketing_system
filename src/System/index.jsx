import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth";

const Home = () => {
  const [auth] = useContext(AuthContext);

  return (
    <div>
      {JSON.stringify(auth?.user?.role)}
      {!auth?.user && <Link to={"/login"}> Login</Link>}

      <br />
      {auth && auth?.user && auth?.user?.role === "admin" && (
        <Link to="/admin">Admin Dasboard</Link>
      )}

      {auth && auth?.user && auth?.user?.role === "agent" && (
        <Link to='/agent'>Agent Dasboard</Link>
      )}
      {auth && auth?.user && auth?.user?.role === "client" && (
        <Link to='/client'>Client Dasboard</Link>
      )}
      {auth && auth?.user && auth?.user?.role === "manager" && (
        <Link>Manager Dasboard</Link>
      )}
    </div>
  );
};

export default Home;
