import React from 'react'
import AdminLayout from './components/AdminLayout'
import AllUsersComponent from '../components/AllUsersComponent'

const AllAdmins = () => {
  return (
    <AdminLayout>
        <AllUsersComponent heading={'All Admins'} url={'/all-admin'}/>
    </AdminLayout>
  )
}

export default AllAdmins
