import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { master_list } from '../../helpers/api/masterList'

const SelectStatesOptions = () => {
    const [list, setList] = useState([])
    useEffect(() => {
        master_list().then(res => {
            const response = res.data;
            if (response !== undefined) {
                if (response.success === true) {
                    setList(response.data.states ? response.data.states.length > 0 ? response.data.states : [] : [])
                }
            }
        })
    }, [])

    return (
        <>
            <option value="0">{`${list && list.length === 0 ? "No records found" : "Select"}`}</option>
            {list && list.map(item => (
                <option value={item.id}>{item.state_code + "  -  " + item.state_name}</option>
            ))}
        </>

    )
}

export default SelectStatesOptions; 