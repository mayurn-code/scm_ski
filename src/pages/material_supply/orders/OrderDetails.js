// @flow
import React from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Button, Tab, Nav } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { Link, useParams } from 'react-router-dom';

// components
// import Timeline from '../../components/Timeline';
// import TimelineItem from '../../components/TimelineItem';
import PageTitle from '../../../components/PageTitle';
import Timeline from '../../../components/Timeline';
import TimelineItem from '../../../components/TimelineItem';
import classNames from 'classnames';
import { tb_tripsData } from './OrdersData';
import Table from '../../../components/Table';
import MaterialSupplySummary from './summary/Summary';
import TransportBookingTripsDelivery from './trips/TripsDelivery';
import MaterialSupplyInvoice from './invoices/Invoice';
import MaterialSupplyOrderInvoice from './invoices/Invoice';
import MaterialSupplyOrderPayments from './payments/PaymentList';

const tabContents = [
    {
        id: '1',
        title: 'Summary',
        icon: 'mdi mdi-home-variant',
        text: ""

    },
    {
        id: '2',
        title: 'Trips & Delivery',
        icon: 'mdi mdi-account-circle',
        text: ""
    },
    {
        id: '3',
        title: 'Invoices',
        icon: 'mdi mdi-cog-outline',
        text: 'Settings - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
    },
    {
        id: '4',
        title: 'Payments',
        icon: 'mdi mdi-cog-outline',
        text: 'Settings - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
    },
];

// order details
const MaterialSupplyOrderDetails = (): React$Element<React$FragmentType> => {
    const { orderid } = useParams()

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Orders", path: "/transport-request/orders" },
                    {
                        label: 'Details',
                        path: '',
                        active: true,
                    },
                ]}
                title={'Order Details'}
            />


            <Row className="justify-content-center">
                <Col lg={11} md={10} sm={11}>
                    <div className="horizontal-steps mt-4 mb-4 pb-5">
                        <div className="horizontal-steps-content">
                            <div className="step-item">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>20/08/2018 07:24 PM</Tooltip>}>
                                    <span> PO Received</span>
                                </OverlayTrigger>
                            </div>
                            <div className="step-item current">
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>21/08/2018 11:32 AM</Tooltip>}>
                                    <span>Accepted</span>
                                </OverlayTrigger>
                            </div>
                            <div className="step-item">
                                <span>Delivery Started</span>
                            </div>
                            <div className="step-item">
                                <span>Delivery Completed</span>
                            </div>
                            <div className="step-item">
                                <span>Invoice Created</span>
                            </div>
                            <div className="step-item">
                                <span>Payment Received</span>
                            </div>
                            <div className="step-item">
                                <span>Ordered Completed</span>
                            </div>
                        </div>

                        <div className="process-line" style={{ width: '33%' }}></div>
                    </div>
                </Col>
            </Row>


            <Tab.Container defaultActiveKey="Summary">
                <Nav variant="pills" justify className="bg-nav-pills mb-3">
                    {tabContents.map((tab, index) => {
                        return (
                            <Nav.Item key={index}>
                                <Nav.Link as={Link} to="#" eventKey={tab.title}>
                                    <i
                                        className={classNames(
                                            tab.icon,
                                            'd-md-none',
                                            'd-block',
                                            'me-1'
                                        )}></i>
                                    <span className="d-none d-md-block">{tab.title}</span>
                                </Nav.Link>
                            </Nav.Item>
                        );
                    })}
                </Nav>

                <Tab.Content>
                    {tabContents.map((tab, index) => {
                        return (
                            <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>

                                {tab.title === "Summary" &&
                                    <MaterialSupplySummary />
                                }

                                {tab.title === "Trips & Delivery" &&
                                    <TransportBookingTripsDelivery orderid={orderid} />
                                }
                                {tab.title === "Invoices" &&
                                    <MaterialSupplyOrderInvoice orderid={orderid}/>
                                }
                                {tab.title === "Payments" &&
                                    <MaterialSupplyOrderPayments orderid={orderid} />
                                }
                            </Tab.Pane>
                        );
                    })}
                </Tab.Content>
            </Tab.Container>


        </>
    );
};
export default MaterialSupplyOrderDetails