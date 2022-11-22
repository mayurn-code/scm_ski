import React from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PageTitle from '../../../../components/PageTitle';


const MaterialSupplyOrderAddPayment = ({ type }) => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[

                ]}
                title={type === "view" ? 'View Payment' : type === 'edit' ? "Edit Payment" : "Add Payment"}
            />
            <Card>
                <Card.Body>


                    <Form className='mt-3'>
                        <Row className="mb-3">
                            <Col sm="4">
                                <Form.Group as={Col} controlId="formGridInvoice">
                                    <Form.Label>Invoice No</Form.Label>
                                    <Form.Control type="text" placeholder="Invoice No" />
                                </Form.Group>
                            </Col>

                            <Col sm="4">
                                <Form.Group as={Col} controlId="formGridInvoiceData">
                                    <Form.Label>Invoice Date</Form.Label>
                                    <Form.Control type="date" placeholder="Invoice Data" />
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row className="mb-3">
                            <Col sm="4">

                                <Form.Group className="mb-3" controlId="formGridBilling">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control type='text' placeholder="10,000" />
                                </Form.Group>
                            </Col>
                            <Col sm="4">
                                <Form.Group className="mb-3" controlId="formGridAddress">
                                    <Form.Label>Modes</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>RTQS</option>
                                        <option value="1">NFTS</option>
                                        <option value="2">Cheque</option>

                                    </Form.Select>
                                </Form.Group>

                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formGridTransaction">
                                    <Form.Label>Transaction No (Cheque NO)</Form.Label>
                                    <Form.Control type='text' placeholder="" />
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row className='mt-2'>
                            <Col sm="12">
                                <Form.Group className="mb-3" controlId="formGridItemsDetails">
                                    <Form.Label>Transaction Details</Form.Label>
                                    <Form.Control type='text' placeholder="" />
                                </Form.Group>
                            </Col>






                        </Row>

                        <Row>

                        </Row>

                        <Row className='mt-2'>
                            <Col sm="7">
                                <Row>
                                    <Col sm="12">
                                        <Form.Label>Invoices</Form.Label>
                                        {['checkbox'].map((type) => (
                                            <div key={`default-${type}`} className="mb-3">
                                                <Form.Check
                                                    type={type}
                                                    id={`default-${type}`}
                                                    label={'INV- 1234 / DT / 08 AUG / 2 lac'}
                                                    className="mb-3"
                                                />
                                                <Form.Check
                                                    type={type}
                                                    id={`default-${type}`}
                                                    label={'INV- 3456 / DT / 08 AUG / 2 lac'}
                                                />


                                            </div>
                                        ))}
                                    </Col>

                                </Row>
                            </Col>
                            <Col sm="2">
                            </Col>

                            <Col sm="3">
                                <Row>
                                    <Col sm="12">

                                        <Form.Group className="mb-3" controlId="Total">
                                            <Form.Label>Upload Receipt</Form.Label>
                                            <Form.Control type='file' placeholder="" />
                                        </Form.Group>




                                    </Col>
                                </Row>
                            </Col>

                        </Row>



                        {type === "view" ?
                            ""

                            : type === 'edit' ?
                                <div className='d-flex justify-content-end'>
                                    <Button variant="primary">Update</Button>
                                </div>
                                :
                                < div className='d-flex justify-content-end'>
                                    <Button variant="primary">Add</Button>
                                </div>
                        }


                    </Form>
                </Card.Body>
            </Card>

        </>
    )
}

export default MaterialSupplyOrderAddPayment;