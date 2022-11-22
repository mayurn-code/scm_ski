import React from 'react'
import { Form } from 'react-bootstrap';

const UnitOfMeasurements = ({ value, onChange, name ,disabled}) => {
  return (
    <>
      <Form.Select name={name ? name : "unit"} value={value} onChange={onChange}>
        <option disabled={disabled} value="">Select</option>
        <option disabled={disabled} value="TONS">TONS</option>
        <option disabled={disabled} value="METRIC TONS">METRIC TONS</option>
        <option disabled={disabled} value="PACKETS">PACKETS</option>
        <option disabled={disabled} value="BAGS">BAGS</option>
        <option disabled={disabled} value="NUMBERS">NUMBERS</option>
      </Form.Select>
    </>
  )
}

export default UnitOfMeasurements;