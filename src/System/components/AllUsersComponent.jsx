import { Avatar, Card, List, Modal } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/Auth";
import toast from 'react-hot-toast';
import axios from 'axios';

const AllUsersComponent = () => {

    const [auth] = useContext(AuthContext)
    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentItem, setCurrectItem] = useState(false)
    const [users, setUsers] = useState([])

    const gettingUsers = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('http://localhost:9000/api/all-users', {
                headers: {
                    Authorization: `Bearer ${auth?.token}`,
                }
            })
            setUsers(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error('Failed, try again')
        }
    }

    useEffect(() => {
        gettingUsers()
    }, [auth && auth.token])

  return (
    <>
      <Card title={"All Users"}>
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Link
                  key="list-loadmore-edit"
                  onClick={() => {
                    setModalOpen(true);
                    setCurrectItem(item);
                  }}
                >
                  edit
                </Link>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={item.name}
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
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  )
}

export default AllUsersComponent
