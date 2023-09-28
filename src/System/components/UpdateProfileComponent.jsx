import { Button, Form, Input, Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Btn from "./Btn";
import { AuthContext } from "../../context/Auth";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateProfileComponent = ({ open, setOpen }) => {
  const [auth, setAuth] = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth && auth.token) {
      setEmail(auth?.user?.email);
      setName(auth?.user?.name);
    }
  }, [auth && auth.token]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Password is not matched");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.put(
        `/update-user`,
        {
          id: auth?.user?._id,
          name,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      // console.log("update_user", data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        // udpate context and local storage for current user only
        if (auth?.user?._id === data._id) {
          setAuth({ ...auth, user: data });
          let fromLocalStorage = JSON.parse(localStorage.getItem("auth"));
          fromLocalStorage.user = data;
          localStorage.setItem("auth", JSON.stringify(fromLocalStorage));
        }

        setLoading(false);
        toast.success("User updated successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("User update failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <Modal
      title={name}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={500}
      footer={null}
    >
      {/* {loading && "loading..."} */}

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
      name: name, 
      email: email, 
    }}

    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      value={email}
      readOnly
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input disabled />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password2"
      value={password2}
      onChange={(e) => setPassword2(e.target.value)}
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
  </Form>

  <Btn loading={loading} className="btn-active" onClick={onSubmit}>
          Update Profile
        </Btn>
    </Modal>
  );
};

export default UpdateProfileComponent;