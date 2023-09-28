import React from "react";
import AdminLayout from "./components/AdminLayout";
import AllUsersComponent from "../components/AllUsersComponent";

const AllAgent = () => {
  return (
    <AdminLayout>
      <AllUsersComponent heading={"All Managers"} url={"/all-agent"} />
    </AdminLayout>
  );
};

export default AllAgent;
