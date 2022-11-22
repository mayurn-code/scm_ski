

import React from 'react'
import { useParams } from 'react-router-dom'
import UserForm from './UserForm'

const EditUser = () => {
    const { userid } = useParams()
    return (
        <>
            <UserForm type="edit" userid={userid} />
        </>
    )
}

export default EditUser;