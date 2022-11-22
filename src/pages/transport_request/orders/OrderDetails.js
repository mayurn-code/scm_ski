// @flow
import React, { useState } from 'react';
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
import { OrderDetailsTranReq } from '../../../helpers';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

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
const TranspReqOrderDetails = (): React$Element<React$FragmentType> => {
    const { orderid } = useParams()
    const [orderDetails, setOrderDetails] = useState(
        {
            po_id: null,
            buyer_id: null,
            buyer_name: "",
            contact_no: "",
            contact_email: "",
            vendor_id: null,
            supplier_Name: "",
            material_id: null,
            material_name: "",
            po_date: "",
            po_validity_date: "",
            po_number: "",
            po_status: "",
            order_status: "",
            pickup_address: "",
            drop_address: "",
            gst_rate: null,
            attachment: "",
            quantity: null,
            total_quantity: null,
            delivered_quantity: null,
            intransit_quantity: null,
            pending_quantity: null,
            po_type: "",
            unit: "",
            supplier_contact_no: "",
            supplier_contact_email: "",
            po_amount: null,
            invoice_submitted_amount: null,
            total_invoice_submitted: null,
            payment_received_amount: null,
            due_amount: null
        }
    )

    const { po_id, buyer_id, buyer_name, contact_no, contact_email,
        vendor_id, supplier_Name, material_id, material_name, po_date,
        po_validity_date, po_number, po_status, order_status, pickup_address,
        drop_address, gst_rate, quantity, total_quantity, delivered_quantity, attachment,
        po_amount, invoice_submitted_amount, total_invoice_submitted, payment_received_amount, due_amount,
        intransit_quantity, pending_quantity, po_type, unit, supplier_contact_no, supplier_contact_email } = orderDetails;

    const loadOrderDetails = (orderid) => {
        OrderDetailsTranReq(orderid).then(res => {
            if (res !== undefined) {
                if (res.data.success) {
                    const result = res.data.data[0]
                    console.log(result)
                    setOrderDetails(result);
                }

            }
        }).catch(e => {
            toast.error(e)
        })
    }

    useEffect(() => {
        loadOrderDetails(orderid);
    }, [])

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
                                    <MaterialSupplySummary
                                        po_type={po_type}
                                        material_name={material_name}
                                        quantity={quantity}
                                        total_quantity={total_quantity}
                                        pickup_address={pickup_address}
                                        drop_address={drop_address}
                                        supplier_Name={supplier_Name}
                                        supplier_contact_email={supplier_contact_email}
                                        supplier_contact_no={supplier_contact_no}
                                        total_quantity={total_quantity}
                                        delivered_quantity={delivered_quantity}
                                        intransit_quantity={intransit_quantity}
                                        pending_quantity={pending_quantity}
                                        po_number={po_number}
                                        po_date={po_date}
                                        gst_rate={gst_rate}
                                        unit={unit}
                                        attachment={attachment}
                                        po_validity_date={po_validity_date}
                                        po_amount={po_amount}
                                        invoice_submitted_amount={invoice_submitted_amount}
                                        total_invoice_submitted={total_invoice_submitted}
                                        payment_received_amount={payment_received_amount}
                                        due_amount={due_amount}
                                    />
                                }
                                {tab.title === "Trips & Delivery" &&
                                    <TransportBookingTripsDelivery orderid={orderid} />
                                    
                                }
                                {tab.title === "Invoices" &&
                                    <MaterialSupplyOrderInvoice orderid={orderid} />
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
export default TranspReqOrderDetails;