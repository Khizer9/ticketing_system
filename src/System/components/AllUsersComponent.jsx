import React, { useContext, useEffect, useState } from "react";
import { Avatar, Card, Form, Input, List, Modal } from "antd";
import { AuthContext } from "../../context/Auth";
import toast from "react-hot-toast";
import axios from "axios";
import UsersBtns from "./UsersBtn";
import { deleteRequest } from "../Actions/Requests";
import Btn from "./Btn";

const AllUsersComponent = ({ heading, url }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentItem, setCurrectItem] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  

  const gettingUsers = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed, try again");
    }
  };

  useEffect(() => {
    if (auth && auth?.token) gettingUsers();
  }, [auth && auth?.token]);

  const onSubmit = async () => {
    setLoading(true)
    const data = await axios.put('/update-user', {id: auth?.user?._id, name, role}, {headers: {Authorization: `Bearer ${auth?.token}`}})
    console.log('udapte user', data)

    if(data.error){
      toast.error(data.error)
    }else{
      if(auth?.user?._id === data.data._id){
        setAuth({...auth, data})
        setCurrectItem(data)

      }
      setLoading(false)
      toast.success('User Updated Successfully!')
    }
  }

  const removeUser = async (_id) => {
    let ok = window.confirm("Are you sure?");
    if (ok) {
      setLoading(true);
      const data = await deleteRequest(`/by/auth/delete-users/${_id}`, auth);
      if (data.ok) {
        setUsers(users.filter((x) => x._id !== _id));
        setLoading(false);
        toast.success("Has been removed!");
      }
    }
  };

  return (
    <>
      <Card title={heading}>
        <UsersBtns />
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <a
                  key="list-loadmore-edit"
                  onClick={() => {
                    setModalOpen(true);
                    setCurrectItem(item);
                  }}
                >
                  edit
                </a>,
                <span
                  role="button"
                  className="text-danger"
                  key="list-loadmore-edit"
                  onClick={() => {
                    removeUser(item._id);
                  }}
                >
                  delete
                </span>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={<a>{item.name}</a>}
                description={item.role}
              />
            </List.Item>
          )}
        />
      </Card>
      

      <Modal
        title={currentItem.name}
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={500}
      >
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
      name: currentItem.name, 
      email: currentItem.email, 
      role: currentItem.role
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
      label="Role"
      name="role"
      value={role}
      onChange={(e) => setRole(e.target.value)}
      rules={[
        {
          required: true,
          message: 'Please input your role!',
        },
      ]}
    >
      <Input />
    </Form.Item>

  </Form>

  <Btn loading={loading} className="btn-active" onClick={onSubmit}>
          Update Profile
        </Btn>
      </Modal>
    </>
  );
};

export default AllUsersComponent;