import React from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PageTitle from '../../../../components/PageTitle';

const MaterialSupplyOrderAddInvoice = ({ type }) => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[

                ]}
                title={type === "view" ? 'View Invoice' : type === 'edit' ? "Edit Invoice" : "Add Invoice"}
            />
            <Card>
                <Card.Body>
                    {/* <h4 className="header-title">Add Invoice</h4> */}

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
                            <Col sm="6">

                                <Form.Group className="mb-3" controlId="formGridBilling">
                                    <Form.Label>Billing To</Form.Label>
                                    <Form.Control type='text' placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formGridAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type='text' placeholder="Apartment, studio, or floor" />
                                </Form.Group>
                            </Col>

                        </Row>
                        <div className='d-flex justify-content-end'>
                            <Button variant="primary">Add</Button>

                        </div>
                        <Row className='mt-2'>
                            <Col sm="3">
                                <Form.Group className="mb-3" controlId="formGridItemsDetails">
                                    <Form.Label>Items Details</Form.Label>
                                    <Form.Control type='text' placeholder="Items" />
                                </Form.Group>
                            </Col>
                            <Col sm="2">
                                <Form.Group className="mb-3" controlId="formGridHSNCode">
                                    <Form.Label>HSN Code</Form.Label>
                                    <Form.Control type='text' placeholder="Code" />
                                </Form.Group>
                            </Col>
                            <Col sm="1">
                                <Form.Group className="mb-3" controlId="formGridCGST">
                                    <Form.Label>CGST</Form.Label>
                                    <Form.Control type='text' placeholder="%" />
                                </Form.Group>
                            </Col>
                            <Col sm="1">
                                <Form.Group className="mb-3" controlId="formGridSGST">
                                    <Form.Label>SGST</Form.Label>
                                    <Form.Control type='text' placeholder="%" />
                                </Form.Group>
                            </Col>
                            <Col sm="1">
                                <Form.Group className="mb-3" controlId="formGridIGST">
                                    <Form.Label>IGST</Form.Label>
                                    <Form.Control type='text' placeholder="%" />
                                </Form.Group>
                            </Col>
                            <Col sm="3">

                                <Form.Group className="mb-3" controlId="formGridIGST">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control type='text' placeholder="" />
                                </Form.Group>


                            </Col>
                            <Col sm="1" className='mt-4'>

                                <span><i className='uil uil-minus-circle fa-4x'></i></span>
                            </Col>


                        </Row>
                        <Row className='mt-2'>
                            <Col sm="3">
                                <Form.Group className="mb-3" controlId="formGridItemsDetails">

                                    <Form.Control type='text' placeholder="Items" />
                                </Form.Group>
                            </Col>
                            <Col sm="2">
                                <Form.Group className="mb-3" controlId="formGridHSNCode">

                                    <Form.Control type='text' placeholder="Code" />
                                </Form.Group>
                            </Col>
                            <Col sm="1">
                                <Form.Group className="mb-3" controlId="formGridCGST">

                                    <Form.Control type='text' placeholder="%" />
                                </Form.Group>
                            </Col>
                            <Col sm="1">
                                <Form.Group className="mb-3" controlId="formGridSGST">

                                    <Form.Control type='text' placeholder="%" />
                                </Form.Group>
                            </Col>
                            <Col sm="1">
                                <Form.Group className="mb-3" controlId="formGridIGST">

                                    <Form.Control type='text' placeholder="%" />
                                </Form.Group>
                            </Col>
                            <Col sm="3">
                                <Form.Group className="mb-3" controlId="formGridIGST">

                                    <Form.Control type='text' placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col sm="1" className='mt-1'>

                                <span><i className='uil uil-minus-circle fa-lg'></i></span>
                            </Col>

                        </Row>
                        <Row>

                        </Row>

                        <Row className='mt-2'>
                            <Col sm="7">
                                <Row>
                                    <Col sm="12">
                                        <Form.Label>Trips</Form.Label>
                                        {['checkbox'].map((type) => (
                                            <div key={`default-${type}`} className="mb-3">
                                                <Form.Check
                                                    type={type}
                                                    id={`default-${type}`}
                                                    label={'Trip 1- 08 / 08 / 22 -50-mt'}
                                                    className="mb-3"
                                                />
                                                <Form.Check
                                                    type={type}
                                                    id={`default-${type}`}
                                                    label={'Trip 2- 18 / 08 / 22 -50-mt'}
                                                />


                                            </div>
                                        ))}
                                    </Col>
                                    <Col sm="12">
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Other Details</Form.Label>
                                            <Form.Control as="textarea" rows={4} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm="2">
                            </Col>

                            <Col sm="3">
                                <Row>
                                    <Col sm="12">

                                        <Form.Group className="mb-3" controlId="Total">
                                            <Form.Label>Total</Form.Label>
                                            <Form.Control type='text' placeholder="" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="Total">
                                            <Form.Label>GST %</Form.Label>
                                            <Form.Control type='text' placeholder="" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="Total">
                                            <Form.Label>Payable Amount</Form.Label>
                                            <Form.Control type='text' placeholder="" />
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

export default MaterialSupplyOrderAddInvoice;