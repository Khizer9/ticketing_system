import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { Button, Card, Input, Select } from "antd";
import { IoCreate, IoHome, IoSendOutline } from "react-icons/io5";
import Breadcrumbs from '../components/BreadCrumbs'
import {PostRequest, getRequest} from '../Actions/Requests'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AuthContext } from "../../context/Auth";
import toast from "react-hot-toast";

const data = [
  { name: "Mon", accounts: 3 },
  { name: "Tue", accounts: 4 },
  { name: "Wed", accounts: 2 },
  { name: "Thu", accounts: 5 },
  { name: "Fri", accounts: 3 },
  { name: "Sat", accounts: 3 },
  { name: "Sun", accounts: 3 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          padding: "5px",
          color: "#0b3d91",
          border: "1px solid #0b3d91",
          background: "rgba(255, 255, 255, 0.6)",
        }}
      >
        <p>{`${payload[0].value} accounts on ${payload[0].payload.name}`}</p>
      </div>
    );
  }
  return null;
};



const { Option } = Select;

const CreateAccount = () => {
  const [auth] = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    category: "",
    role: "",
    password: "",
    password2: "",
  });

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getCategoryId = async () => {
    const data = await getRequest('all/categories', auth)
    if(data){
      console.log(data, 'categoryID')
    }
  }

  useEffect(() => {
    if(auth && auth.token){
      getCategoryId()
    }
  }, [auth, auth.token])

  const handleSubmit = async (e) => {
    if(formData.name || formData.email || formData.password || formData.role || formData.category === ''){
      toast.error('Please fill manadatory fields')
    }else{
      e.preventDefault();
      if (formData.password !== formData.password2) {
        alert("Passwords do not match!");
        return;
      }
  
      const data = await PostRequest('/register/a/user', formData, auth)
      if(data){
        toast.success('Account created successfully!')
        setFormData({ email: "",name: "",category: "",role: "",password: "",password2: ""})
      }else {
        toast.error('Invalid details')
      }
      
      console.log("Form data submitted:", formData); 
      console.log("data submitted:", data);
    }
     
  };

  const totalAccounts = data.reduce((acc, curr) => acc + curr.accounts, 0);

  return (
    <AdminLayout>
      <Breadcrumbs
        from={"Admin"}
        fromPath={"/admin"}
        to={"Create Account"}
        fromIcon={<IoHome className="bread-text" />}
        toIcon={<IoCreate className="bread-text-active" />}
      />
      <Card
        className="cardStyle mt-3"
        style={{ background: "linear-gradient(45deg, #0b3c913a, #00000033)" }}
      >
        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label for="exampleFormControlInput1"> Email</label>
              <Input
                type="email"
                style={{ border: "none" }}
                placeholder="example@hadiraza.com "
                name="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label for="exampleFormControlInput1">Name</label>
              <Input
                type="text"
                style={{ border: "none" }}
                placeholder="User's name"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label for="exampleFormControlInput1"> Password</label>
              <Input
                type="password"
                style={{ border: "none" }}
                name="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label for="exampleFormControlInput1">Confrim Password</label>
              <Input
                type="password"
                style={{ border: "none" }}
                name="password2"
                value={formData.password2}
                onChange={(e) => handleChange("password2", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label>
                Choose Role<span className="text-danger">*</span>
              </label>
              <Select
                required
                value={formData.role}
                onChange={(value) => handleChange("role", value)} // Pass the name and value
                style={{ width: "100%" }}
              >
                <Option value="">Choose</Option>
                <Option value="admin">Admin</Option>
                <Option value="manager">Manager</Option>
                <Option value="agent">Agent</Option>
                <Option value="client">Client</Option>
              </Select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label>
                Choose Category<span className="text-danger">*</span>
              </label>
              <Select
                required
                value={formData.category}
                onChange={(value) => handleChange("category", value)} // Pass the name and value
                style={{ width: "100%" }}
              >
                <Option value="">Choose</Option>
                <Option value="650179a52db1ff5e502e89e4">Admin</Option>
                <Option value="650c02d3f370f2afcc8e3ef5">Manager</Option>
                <Option value="650c02d3f370f2afcc8e3ef5">Agent</Option>
                <Option value="650c02d3f370f2afcc8e3ef5">Client</Option>
              </Select>
            </div>
          </div>
        </div>

        <Button className="clicks mt-3" onClick={handleSubmit} icon={<IoSendOutline />}>
          Submit
        </Button>
      </Card>

      <div className="d-flex gap-3">
        <div
          style={{
            width: "50%",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            background: "linear-gradient(45deg, #000000 ,#0b3d91)",
            color: "white",
            borderRadius: "10px",
          }}
        >
          <div>
            <strong>{totalAccounts}</strong> agents accounts created
          </div>
          <div style={{ width: "40%", height: 100 }}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
                <XAxis dataKey="name" tick={{ fill: "#ffffff" }} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="accounts"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            width: "50%",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            background: "linear-gradient(45deg, #000000 ,#0b3d91)",
            color: "white",
            borderRadius: "10px",
          }}
        >
          <div>
            <strong>{totalAccounts}</strong> manager accounts created
          </div>
          <div style={{ width: "40%", height: 100 }}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
                <XAxis dataKey="name" tick={{ fill: "#ffffff" }} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="accounts"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateAccount;