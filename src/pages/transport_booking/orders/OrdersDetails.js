// @flow
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip, Button, Tab, Nav } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { Link, useParams, useLocation } from 'react-router-dom';

// components
import PageTitle from '../../../components/PageTitle';
import Timeline from '../../../components/Timeline';
import TimelineItem from '../../../components/TimelineItem';
import classNames from 'classnames';
import { tb_tripsData } from './OrdersData';
import Table from '../../../components/Table';
import TransportBookingSummary from './summary/Summary';
import TransportBookingTripsDelivery from './trips/TripsDelivery';
import TransportBookingsInvoice from './invoices/Invoice';
import TransportBookingOrderPayments from './payments/PaymentList';
import { order_details } from '../../../helpers';
import { toast } from 'react-toastify';

const tabContents = [
    {
        id: '1',
        title: 'Summary'
    },
    {
        id: '2',
        title: 'Trips & Delivery'

    },
    {
        id: '3',
        title: 'Invoices'
    },
    {
        id: '4',
        title: 'Payments'
    },
];

// order details
const TransportBookingsOrdersDetails = (): React$Element<React$FragmentType> => {
    const { orderid } = useParams();
    const { state } = useLocation();
    const [progressBarWidth, setProgressBarWidth] = useState(0)
    const [currentActivePoint, setCurrentActivePoint] = useState("Accepted")
    const [defaultActiveKey, setDefaultActiveKey] = useState("Summary")
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
            pickup_state_name: "",
            pickup_state_id: null,
            pickup_city_name: null,
            pickup_city_id: null,
            drop_address: null,
            drop_state_name: null,
            drop_state_id: null,
            drop_city_name: null,
            drop_city_id: null,
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
        po_validity_date, po_number, po_status, order_status, pickup_address, pickup_state_name, pickup_state_id,
        pickup_city_name, pickup_city_id, drop_address, drop_state_name, drop_state_id,
        drop_city_name, drop_city_id, gst_rate, quantity, total_quantity, delivered_quantity, attachment,
        po_amount, invoice_submitted_amount, total_invoice_submitted, payment_received_amount, due_amount,
        intransit_quantity, pending_quantity, po_type, unit, supplier_contact_no, supplier_contact_email } = orderDetails;

    const loadOrderDetails = () => {
        const response = order_details(orderid);
        let resultObj;
        response.then(result => {
            setOrderDetails(result.data.data[0])
            progressBarFunction(result.data.data[0].order_status);
        }).catch(error => {
            setOrderDetails([])
            setProgressBarWidth(0);
            setCurrentActivePoint("None");
            return toast.error(error)
        })
    }

    useEffect(() => {
        const activeTabState = sessionStorage.getItem("activeTabConfirmOrder")
        if (activeTabState) {
            setDefaultActiveKey(activeTabState);
        }
        loadOrderDetails();
    }, [])

    const progressBarFunction = (order_status) => {
        if (order_status === "Pending") {
            setProgressBarWidth(18);
            setCurrentActivePoint("Pending");
        } else if (order_status === "InTransit") {
            setProgressBarWidth(33);
            setCurrentActivePoint("InTransit");
        } else if (order_status === "Delivered") {
            setProgressBarWidth(50);
            setCurrentActivePoint("Delivered");
        } else if (order_status === "InvoiceCreated") {
            setProgressBarWidth(66);
            setCurrentActivePoint("InvoiceCreated");
        } else if (order_status === "PaymentReceived") {
            setProgressBarWidth(82);
            setCurrentActivePoint("PaymentReceived");
        }
        else if (order_status === "Closed") {
            setProgressBarWidth(100);
            setCurrentActivePoint("Closed");
        }
    }

    const tripsData = {
        uom: unit,
        material_name: material_name,
        drop_city_name: drop_city_name,
        drop_city_id: drop_city_id,
        pickup_city_name: pickup_city_name,
        pickup_city_id: pickup_city_id,
        drop_state_name: drop_state_name,
        drop_state_id: drop_state_id,
        pickup_state_name: pickup_state_name,
        pickup_state_id: pickup_state_id,
        pickup_address: pickup_address,
        drop_address: drop_address,
        quantity: quantity
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Orders", path: "/transport-booking/orders" },
                    {
                        label: 'Details',
                        path: '',
                        active: true,
                    }
                ]}
                title={'Order Details'}
            />

            <Row className="justify-content-center">
                <Col lg={11} md={10} sm={11}>
                    <div className="horizontal-steps mt-4 mb-4 pb-5">
                        <div className="horizontal-steps-content">
                            <div className={`step-item ${currentActivePoint === "None" ? "current" : ""}`}>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <Tooltip>20/08/2018 07:24 PM</Tooltip>}>
                                    <span> PO Received</span>
                                </OverlayTrigger>
                            </div>
                            <div className={`step-item ${currentActivePoint === "Pending" ? "current" : ""}`}>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>21/08/2018 11:32 AM</Tooltip>}>
                                    <span>Accepted</span>
                                </OverlayTrigger>
                            </div>
                            {/* InTransit,Pending,Delivered,InvoiceCreated,PaymentReceived,Closed */}
                            <div className={`step-item ${order_status === "InTransit" ? "current" : ""}`}>

                                <span>Delivery Started</span>
                            </div>
                            <div className={`step-item ${order_status === "Delivered" ? "current" : ""}`}>
                                <span>Delivery Completed</span>
                            </div>
                            <div className={`step-item ${order_status === "InvoiceCreated" ? "current" : ""}`}>
                                <span>Invoice Created</span>
                            </div>
                            <div className={`step-item ${order_status === "PaymentReceived" ? "current" : ""}`}>
                                <span>Payment Received</span>
                            </div>
                            <div className={`step-item ${order_status === "Closed" ? "current" : ""}`}>
                                <span>Ordered Completed</span>
                            </div>
                        </div>
                        <div className="process-line" style={{ width: `${progressBarWidth || 0}%` }}></div>
                    </div>
                </Col>
            </Row>


            <Tab.Container defaultActiveKey={defaultActiveKey}>
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
                                    <TransportBookingSummary
                                        po_type={po_type}
                                        material_name={material_name}
                                        quantity={quantity}
                                        total_quantity={total_quantity}
                                        drop_city_name={drop_city_name}
                                        pickup_city_name={pickup_city_name}
                                        drop_state_name={drop_state_name}
                                        pickup_state_name={pickup_state_name}
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
                                    <TransportBookingTripsDelivery
                                        orderid={orderid}
                                        tripsData={tripsData}
                                    />
                                }
                                {tab.title === "Invoices" &&
                                    <TransportBookingsInvoice orderid={orderid} />
                                }
                                {tab.title === "Payments" &&
                                    <TransportBookingOrderPayments orderid={orderid} />
                                }
                            </Tab.Pane>
                        );
                    })}
                </Tab.Content>
            </Tab.Container>
        </>
    );
};
export default TransportBookingsOrdersDetails