import React from 'react'
import { Form } from 'react-bootstrap'

const CitySelect = ({name,value,onChange}) => {
    return (
        <Form.Select name={name} value={value} onChange={onChange}>
            <option value={null}>Select</option>
            <option value={1}>Bhopal</option>
            <option value={2}>Madala</option>
            
        </Form.Select>
    )
}

export default CitySelect