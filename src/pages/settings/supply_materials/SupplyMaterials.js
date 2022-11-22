// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Table, } from 'react-bootstrap';
import classNames from 'classnames';
import Form from 'react-bootstrap/Form';
import PageTitle from '../../../components/PageTitle';
import { useState } from 'react';





// import { products } from "../apps/Ecommerce/Data";

const BasicTable = () => {
    return (
        <div className="table-responsive">
            <table className="table mb-0 text-nowrap">
                <thead>
                    <tr>
                        <th>Material</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ultra fire ash</td>
                        <td className="table-action">
                            <Link to="#" className="action-icon">
                                <i className="mdi mdi-delete"></i>
                            </Link>
                        </td>

                    </tr>
                    <tr>
                        <td>Cement</td>
                        <td className="table-action ">
                            <Link to="#" className="action-icon">
                                <i className="mdi mdi-delete"></i>
                            </Link>
                        </td>

                    </tr>
                    <tr>
                        <td>Marble</td>
                        <td className="table-action ">
                            <Link to="#" className="action-icon">
                                <i className="mdi mdi-delete"></i>
                            </Link>
                        </td>

                    </tr>

                </tbody>
            </table>
        </div>
    );
};








/* status column render */
const StatusColumn = ({ row }) => {
    return (
        <>
            <span
                className={classNames('badge', {
                    'bg-success': row.original.status,
                    'bg-danger': !row.original.status,
                })}>
                {row.original.status ? 'Active' : 'Deactivated'}
            </span>


        </>
    );
};




// main component
const SettingsSupplyMaterials = (): React$Element<React$FragmentType> => {

    const [pageTitle, setPageTitle] = useState("Material List For Supply")
    const [activeBtn, setActiveBtn] = useState("supply")

    const changePageData = (module) => {
        setActiveBtn(module)
        if (module === "supply") {
            setPageTitle("Material List For Supply")
        }
        else if (module === "transport") {
            setPageTitle("Material List For Transport")
        }
    }
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={pageTitle}
            />
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={5}>
                                    <Form className="d-flex">
                                        <Button variant="">Search</Button>
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-4"
                                            aria-label="Search"
                                        />
                                    </Form>
                                </Col>
                                <Col sm={7}>
                                    <div className="text-sm-end">
                                        <Button onClick={() => changePageData("supply")} variant="primary" className={activeBtn === "supply" ? "mb-2 me-1 active" : "mb-2 me-1"}>
                                            Supply
                                        </Button>

                                        <Button onClick={() => changePageData("transport")} variant="primary" className={activeBtn === "transport" ? "mb-2 me-1 active" : "mb-2 me-1"}>
                                            Transport
                                        </Button>
                                    </div>
                                </Col>
                            </Row>

                            {/* <h4>Material List For Supply</h4> */}
                            <div className="mt-3">
                                <Col sm={5}>

                                    <Form className="d-flex">

                                        <Form.Control
                                            type="search"
                                            placeholder="Material"
                                            className="me-2"
                                            aria-label="Search"
                                        />
                                        <Button variant="primary">ADD</Button>
                                    </Form>
                                </Col>
                                <Col xs={12}>
                                    <BasicTable />
                                </Col>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};






export default SettingsSupplyMaterials;