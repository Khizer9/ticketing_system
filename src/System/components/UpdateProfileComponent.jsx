import { Modal } from 'antd'
import React from 'react'

const UpdateProfileComponent = ({open, setOpen, auth}) => {
    console.log(auth, "auth")
  return (
    <Modal
    title={auth.user.name}
    centered
    open={open}
    onOk={() => setOpen(false)}
    onCancel={() => setOpen(false)}
    width={500}
  >
    <p>some contents...</p>
    <p>some contents...</p>
    <p>some contents...</p>
  </Modal>
  )
}

export default UpdateProfileComponent
