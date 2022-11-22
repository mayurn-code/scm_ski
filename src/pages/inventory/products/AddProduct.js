import React from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PageTitle from '../../../components/PageTitle';


const InventoryAddProduct = ({ type }) => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Products', path: '/inventory/products' },
                    {
                        label:
                            type === "view" ? "View" : type === "edit" ? "Edit" : 'Add',
                        path: '', active: true
                    },
                ]}
                title={type === "view" ? "Products View" : type === "edit" ? "Edit Product" : "Add Product"}
            />
            <Card>
                <Card.Body>


                    <Form className='mt-3'>
                        <Row className="mb-3">
                            <Col sm="6">
                                <Form.Group as={Col} controlId="formGridProduct">
                                    <Form.Label>Product / Material</Form.Label>
                                    <Form.Control type="text" placeholder="" />
                                </Form.Group>
                            </Col>



                        </Row>
                        <Row className="mb-2">
                            <Col sm="6">

                                <Form.Group className="mb-3" controlId="formGridBilling">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type='text' placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col sm="6">
                                <Form.Group className="mb-3" controlId="formGridAddress">
                                    <Form.Label>UOM</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>MT</option>
                                        <option value="1">Bag</option>
                                        <option value="2">Ton</option>
                                        <option value="2">Nos</option>

                                    </Form.Select>
                                </Form.Group>

                            </Col>


                        </Row>

                        <Row>
                            <Col sm="12">
                                <Form.Group className="mb-2" controlId="formGridItemsDetails">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={5} />
                                </Form.Group>
                            </Col>
                        </Row>
                        {type === "view" ? "" :
                            type === "edit" ?
                                <div className='d-flex justify-content-end'>
                                    <Button variant="primary">Update</Button>
                                </div>
                                :
                                <div className='d-flex justify-content-end'>
                                    <Button variant="primary">Add</Button>
                                </div>
                        }

                    </Form>
                </Card.Body>
            </Card>

        </>
    )
}

export default InventoryAddProduct;