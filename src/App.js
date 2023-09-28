import { Route, Routes } from "react-router-dom";
import Home from "./System";
import Login from "./System/Login";
import Register from "./System/Register";
import ForgetPassword from "./System/ForgetPassword";
import Admin from "./System/Admin";
import Client from "./System/Client";
import Agent from "./System/Agent";
import PrivateRoute from "./System/PrivateRoute";
import AllUsers from "./System/Admin/AllUsers";
import AllAgent from "./System/Admin/AllAgent";
import AllManager from "./System/Admin/AllManagers";
import AllAdmins from "./System/Admin/AllAdmins";
import Category from "./System/Admin/Category";
import CreateAccount from "./System/Admin/CreateAccount";
// import Check from "./Check";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="*" element={"Not found"} />

        {/* Admin Routes */}
      <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/admin' element={<Admin/>}/>
            <Route exact path='/admin/all-users' element={<AllUsers/>}/>
            <Route exact path='/admin/all-agents' element={<AllAgent/>}/>
            <Route exact path='/admin/all-managers' element={<AllManager/>}/>
            <Route exact path='/admin/all-admins' element={<AllAdmins/>}/>
            <Route exact path='/admin/category' element={<Category/>}/>
            <Route exact path='/admin/create-account' element={<CreateAccount/>}/>

      </Route>

        {/* Client Routes */}
        <Route path="/client" element={<Client />} />

        {/* Agent Routes */}
        <Route path="/agent" element={<Agent />} />
        
      </Routes>
    </>
  );
};

export default App;
