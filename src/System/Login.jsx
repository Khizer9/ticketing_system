import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

const Login = () => {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:9000/api/login",
        values
      );
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setAuth({ user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Successfully logged in");
        setLoading(false);

        router("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (auth && auth?.token) {
      router("/");
    }
  }, [auth, router]);

  return (
    <>
      {loading && "loading..."}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
