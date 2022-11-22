import React from 'react'
import { Form } from 'react-bootstrap';

const SelectTruckTrackStatus = ({value}) => {
    
    return (
        <>
            <Form.Select value={value}>
                <option value="Scheduled">Scheduled</option>
                <option value="InTransit">InTransit</option>
                <option value="Pending">Pending</option>
            </Form.Select>

        </>
    )
}

export default SelectTruckTrackStatus;