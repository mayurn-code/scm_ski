import React from 'react';
import { Button, Card, Col, Row, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PageTitle from '../../../components/PageTitle';

const InventoryAddDailyProduction = ({ type }) => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Daily Productions', path: '/inventory/daily-production' },
                    {
                        label:
                            type === "view" ? "View" : 'Add',
                        path: '', active: true
                    },
                ]}
                title={type === "view" ? "View Production" : "Add Production"}
            />
            <Card>
                <Card.Body>


                    <Form className='mt-3'>
                        <Row className="mb-3">


                            <Col sm="4">
                                <Form.Group as={Col} controlId="formGridInvoiceData">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" placeholder="" />
                                </Form.Group>
                            </Col>

                        </Row>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product / Material</th>
                                    <th>UOM</th>
                                    <th> Production Qty</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Material 1</td>
                                    <td>Ton</td>
                                    <td><Button variant="outline-primary">200</Button></td>
                                </tr>
                                <tr>
                                    <td>Material 2</td>
                                    <td>MT</td>
                                    <td><Button variant="outline-primary">500</Button></td>
                                </tr>
                                <tr>
                                    <td>Material 3</td>
                                    <td>Bags</td>
                                    <td><Button variant="outline-primary">100</Button></td>
                                </tr>
                                <tr>
                                    <td>Material 4</td>
                                    <td>Nos</td>
                                    <td><Button variant="outline-primary">1000</Button></td>
                                </tr>
                            </tbody>
                        </Table>
                        {type === "view" ? "" :
                            <div className='d-flex justify-content-end'>
                                <Button variant="primary">Update</Button>
                            </div>
                        }
                    </Form>
                </Card.Body>
            </Card>

        </>
    )
}

export default InventoryAddDailyProduction;