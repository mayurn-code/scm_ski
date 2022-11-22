import React from 'react'
import { Form } from 'react-bootstrap'

const StatesSelect = ({name,value,onChange}) => {
    return (
        <Form.Select name={name} value={value} onChange={onChange}>
            <option value={null}>Select</option>
            <option value={1}>Madhya Pradesh</option>
            
        </Form.Select>
    )
}

export default StatesSelect;