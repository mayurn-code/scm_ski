// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PageTitle from '../../../components/PageTitle';

// // components
// import PageTitle from '../../components/PageTitle';

const MaterialProcuPurchasingOrder = () => {
    return (

        <>

            <PageTitle
                breadCrumbItems={[

                    { label: 'Purchasing Order', path: '', active: true },
                ]}
                title={'Purchasing Order'}
            />

            {/* <h4 className="header-title mb-3">Purchasing Order</h4> */}
            <div className='container-fluid'>

                <div className='row'>
                    <div className='col-lg-6'>

                        <h4>Material</h4>
                        <p>Ultratative fly</p>




                    </div>
                    <div className='col-lg-6'>

                        <h4>Supplier</h4>
                        <p>ABC Suppliers</p>
                    </div>
                </div>
            </div>

            <div className='Container-fluid'>
            </div>
            <h4 className="header-title mb-4">PO Details</h4>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Site Location</Form.Label>
                                <Form.Select>
                                    <option value="1">Gurgaon</option>
                                    <option value="2">Noida</option>
                                    <option value="2">Hyderabad</option>
                                    <option value="2">Pune</option>

                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Unit</Form.Label>
                                <Form.Select>
                                    <option value="1">Tons</option>
                                    <option value="3">Metric Tons</option>
                                    <option value="4">Bags</option>
                                    <option value="5">Packets</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type='text' />

                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>PO Date</Form.Label>
                                <Form.Control type='date' />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>PO Number</Form.Label>
                                <Form.Control type='text' />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>PO Value (Amount)</Form.Label>
                                <Form.Control type='text' />

                            </Form.Group>
                        </Row>
                    </div>
                    <div className='col-lg-8'>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>GST in %</Form.Label>
                                <Form.Control type='text' />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Upload PO</Form.Label>
                                <Form.Control type='flie' />
                            </Form.Group>


                        </Row>

                    </div>



                </div>

            </div>

            <Button variant="primary" type="submit">
                Send PO
            </Button>


        </>
    );
};


export default MaterialProcuPurchasingOrder;