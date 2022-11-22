

import React from 'react'
import { useParams } from 'react-router-dom';
import UserForm from './UserForm'

const ViewUser = () => {
    const { userid } = useParams();
    return (
        <>
            <UserForm type="view" userid={userid} />
        </>
    )
}

export default ViewUser;