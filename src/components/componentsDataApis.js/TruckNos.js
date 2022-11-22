import React, { useState } from 'react'
import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { trucks_list } from '../../helpers/api/truckList'

const SelectTruckNos = ({ name, value, onChange }) => {

    const [data, setData] = useState([])

    const loadTrucks = () => {
        const response = trucks_list();
        response.then(res => {
            if (res !== undefined) {
                if (res.data.success === true) {
                    setData(res.data.data)
                } else {
                    setData([])
                }
            }
        }).catch(e => {
            toast.error(e)
        })
    }
    useEffect(()=>{
        loadTrucks();
    },[])

    return (
        <Form.Select name={name} value={value} onChange={onChange} >
            <option value={0}>Select</option>
            {data.length !== 0 ? data.map(item => (
                <option key={item.id + "Trucks"} value={item.id}>{item.registration_no}</option>
            ))
                :
                <option value={0}>No records found.</option>
            }
        </Form.Select>
    )
}

export default SelectTruckNos