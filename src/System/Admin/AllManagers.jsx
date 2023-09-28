import React from "react";
import AdminLayout from "./components/AdminLayout";
import AllUsersComponent from "../components/AllUsersComponent";

const AllManagers = () => {
  return (
    <AdminLayout>
      <AllUsersComponent heading={"All Managers"} url={"/all-manager"} />
    </AdminLayout>
  );
};

export default AllManagers;
