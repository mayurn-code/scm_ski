import React from 'react';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { drivers_list } from '../../helpers/api/driversList';

const SelectDriver = ({ name, value, onChange }) => {
    const [data, setdata] = useState([])

    const loadDrivers = () => {
        const response = drivers_list().then(res => {
            if (res !== undefined) {
                if (res.data.success === true) {
                    setdata(res.data.data)
                } else {
                    setdata([])
                }
            }
        }).catch(e => {
            toast.error(e)
        })
    }

    useEffect(() => {
        loadDrivers();
    }, [])
    return (
        <Form.Select name={name} value={value} onChange={onChange || null}>
            <option value={null}>Select</option>
            {data.length !== 0 ? data.map(item => (
                <option key={item.id + "drivers"} value={item.id}>{item.first_name + ' - ' + item.user_type}</option>
            ))
                :
                <option value={null}>No records found.</option>
            }
        </Form.Select>
    )
}

export default SelectDriver;