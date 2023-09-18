import { Route, Routes } from "react-router-dom";
import Home from "./System";
import Login from "./System/Login";
import Register from "./System/Register";
import ForgetPassword from "./System/ForgetPassword";
import Admin from "./System/Admin";
import Client from "./System/Client";
import Agent from "./System/Agent";
import PrivateRoute from "./System/PrivateRoute";
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
      </Route>
        {/* <PrivateRoute exact path='/admin' element={<Admin />}/> */}
        {/* <Route path="/admin" element={<Admin />} /> */}
        {/* <Route path="/check" element={<Check />} /> */}

        {/* Client Routes */}
        <Route path="/client" element={<Client />} />

        {/* Agent Routes */}
        <Route path="/agent" element={<Agent />} />
        
      </Routes>
    </>
  );
};

export default App;
