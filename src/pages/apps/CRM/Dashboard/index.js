// @flow
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Donut, Legend, ResponsiveContainer } from 'britecharts-react';
import Chart from 'react-apexcharts';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
// components
import PageTitle from '../../../../components/PageTitle';
import TodoList from '../../../../components/TodoList';

import Statistics from './Statistics';
import CampaignsChart from './CampaignsChart';
import RevenueChart from './RevenueChart';
import Performers from './Performers';
import Leads from './Leads';
import CampaignWidget from './CampaignWidget';

// dummy data
import { recentBookingData, recentRfqsData, recentLeads, recentBookingFleetOwnerData } from './data';

// Icons
import busIcon from "../../../../assets/images/dashboard/bus.png"
import bookingsIcon from "../../../../assets/images/dashboard/bookings.png"
import openQuoteIcon from "../../../../assets/images/dashboard/open-quote.png"
import pendingInvoiceIcon from "../../../../assets/images/dashboard/pending-invoice.png"
import inTransitIcon from "../../../../assets/images/dashboard/truckDelivery.png"
import requestQuoteIcon from "../../../../assets/images/dashboard/requestQuote.png"
import driverIcon from "../../../../assets/images/dashboard/driver.png"
import remindersIcon from "../../../../assets/images/dashboard/reminders.png"
import fleettruckIcon from "../../../../assets/images/dashboard/fleettruck.png"
import customersIcon from "../../../../assets/images/dashboard/customers.png"
import CardTitle from '../../../../components/CardTitle';
import Timeline from '../../../../components/Timeline';
import TimelineItem from '../../../../components/TimelineItem';

const recentBookingsTheadList = [
    {
        title: "Booking Id"
    },
    {
        title: "Name"
    },
    {
        title: "Status"
    }
]
const recentRfqsTheadList = [{
    title: "Quote Id"
}, {
    title: "Name"
}, {
    title: "Status"
}
]

const staticsBuyerData = [
    {
        icon: <img src={bookingsIcon} alt={bookingsIcon} />,
        description: "Open Orders",
        title: "Open Orders",
        stats: "22",
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    },
    {
        icon: <img width={64} src={openQuoteIcon} alt={openQuoteIcon} />,
        description: "Open Quotes",
        title: "Open Quotes",
        stats: "91",
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    },
    {
        icon: <img width={64} src={pendingInvoiceIcon} alt={pendingInvoiceIcon} />,
        description: "Pending Invoices",
        title: "Pending Invoices",
        stats: "8",
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
    },

    {
        icon: <img src={inTransitIcon} alt={inTransitIcon} />,
        description: "Orders On Transit",
        title: "Orders On Transit",
        stats: "53",
        data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
    }
]

const staticsSupplierData = [
    {
        description: "Open Orders",
        title: "Open Orders",
        stats: "22",
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    },
    {
        description: "Open Quotes",
        title: "Open Quotes",
        stats: "91",
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    },
    {
        description: "Pending Invoices",
        title: "Pending Invoices",
        stats: "8",
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
    },
    {
        description: "Orders On Transit",
        title: "Orders On Transit",
        stats: "53",
        data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
    }
]

const staticsFleetOwnerData = [
    {
        icon: <img src={bookingsIcon} alt={bookingsIcon} width={64} />,
        description: "Open Orders",
        title: "Open Orders",
        stats: "22",
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
        itemData: [
            {
                item: "Assigned 10",
            },
            {
                item: "Not Assigned 10",
            }
        ]
    },
    {
        icon: <img src={inTransitIcon} alt={inTransitIcon} width={64} />,
        description: "In Transit",
        title: "In Transit",
        stats: "91",
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
        itemData: [
            {
                item: "Moving 6",
            },
            {
                item: "Stopped 3",
            }
        ]
    },
    {
        icon: <img src={fleettruckIcon} alt={fleettruckIcon} width={64} />,
        description: "Truck",
        title: "Truck",
        stats: "8",
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
        itemData: [
            {
                item: "Active 10",
            },
            {
                item: "Not Active 12",
            }
        ]
    },
    {
        icon: <img src={driverIcon} alt={driverIcon} width={64} />,
        description: "Drivers",
        title: "Drivers",
        stats: "53",
        data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82],

    },
    {
        icon: <img src={requestQuoteIcon} alt={requestQuoteIcon} width={64} />,
        description: "Open RFQ'S",
        title: "Open RFQ'S",
        stats: "53",
        data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
    },
    {
        icon: <img src={pendingInvoiceIcon} alt={pendingInvoiceIcon} width={64} />,
        description: "Pending Invoices",
        title: "Pending Invoices",
        stats: "53",
        data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
    },
    {
        icon: <img src={remindersIcon} alt={remindersIcon} width={64} />,
        description: "Reminders",
        title: "Reminders",
        stats: "53",
        data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82],
        itemData: [
            {
                item: "GPS Payment 6",
            },
            {
                item: "Services 4",
            }
        ]
    },
    {
        icon: <img src={customersIcon} alt={customersIcon} width={64} />,
        description: "Customers",
        title: "Customers",
        stats: "53",
        data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
    }
]

const donutData = [
    { name: 'Within Time', id: 1, quantity: 87, percentage: 87 },
    { name: 'Out Of Time', id: 2, quantity: 13, percentage: 13 },
];


const apexBarChartOpts = {
    chart: {
        height: 260,
        type: 'bar',
        stacked: true,
        parentHeightOffset: 0,
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '20%',
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
    },
    zoom: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    colors: ['#727cf5', '#e3eaef'],
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            formatter: function (val) {
                return val + 'k';
            },
        },
    },
    fill: {
        opacity: 1,
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return '$' + val + 'k';
            },
        },
    },
};

const apexBarChartData = [
    {
        name: 'Actual',
        data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81],
    },
    {
        name: 'Projection',
        data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59],
    },
];

const CRMDashboardPage = ({ title }): React$Element<React$FragmentType> => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={title}
            />


            {title === "Fleet Owner Dashboard"
                ? <Statistics staticsData={staticsFleetOwnerData} /> :
                title === "Buyer Dashboard" ?
                    <Statistics staticsData={staticsBuyerData} />
                    :
                    <Statistics staticsData={staticsBuyerData} />
            }

            <Row>
                {/* BOOKINGS VS DELIVERY */}
                <Col lg={6}>
                    {title === "Fleet Owner Dashboard" ?
                        <>
                            <Card>
                                <Card.Body>
                                    <h4 className="header-title mb-4">delivery Status</h4>
                                    <div className="donut-container">
                                        <ResponsiveContainer
                                            render={() => (
                                                <Row>
                                                    <Col>
                                                        <Donut
                                                            data={donutData}
                                                            height={300}
                                                            internalRadius={80}
                                                            colorSchema={['#727cf5', '#0acf97', '#6c757d', '#fa5c7c', '#ffbc00', '#39afd1']}
                                                            isAnimated={false}
                                                            hasFixedHighlightedSlice={true}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Legend
                                                            data={donutData}
                                                            height={200}
                                                            width={250}
                                                            numberFormat={'s'}
                                                            colorSchema={['#727cf5', '#0acf97', '#6c757d', '#fa5c7c', '#ffbc00', '#39afd1']}
                                                            margin={{ top: 10, bottom: 10, left: 0, right: 30 }}
                                                        />
                                                    </Col>
                                                </Row>
                                            )}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>

                        </>
                        :
                        <>
                            <Card className="card-h-100">
                                <Card.Body>
                                    <CardTitle
                                        containerClass="d-flex align-items-center justify-content-between mb-2"
                                        title="Orders  V/S DELIVERY"
                                        menuItems={[
                                            { label: 'Sales Report' },
                                            { label: 'Export Report' },
                                            { label: 'Profit' },
                                            { label: 'Action' },
                                        ]}
                                    />
                                    <div dir="ltr">
                                        <Chart
                                            options={apexBarChartOpts}
                                            series={apexBarChartData}
                                            type="bar"
                                            className="apex-charts"
                                            height={255}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </>
                    }
                </Col>

                {/* Recent Rfq's */}
                <Col lg={6}>
                    <Card>
                        <Card.Body className="pb-0">
                            <CardTitle
                                containerClass="d-flex align-items-center justify-content-between mb-2"
                                title="Recent Activity"
                                menuItems={[
                                    { label: 'Sales Report' },
                                    { label: 'Export Report' },
                                    { label: 'Profit' },
                                    { label: 'Action' },
                                ]}
                            />
                        </Card.Body>

                        {title === "Buyer Dashboard"
                            ? <>
                                <SimpleBar style={{ maxHeight: '412px', width: '100%' }}>
                                    <Card.Body className="py-0">
                                        <Timeline>
                                            <TimelineItem>
                                                <i className=" bg-primary-lighten text-primary timeline-icon">4</i>
                                                <div className="timeline-item-info">
                                                    <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                        PO Accepted
                                                    </Link>
                                                    <small>
                                                        PO 1234 has been accepted by XYZ Supplier {' '}
                                                    </small>
                                                    <p className="mb-0 pb-2">
                                                        <small className="text-muted">5 hours ago</small>
                                                    </p>
                                                </div>
                                            </TimelineItem>
                                            <TimelineItem>
                                                <i className=" bg-primary-lighten text-primary timeline-icon">3</i>
                                                <div className="timeline-item-info">
                                                    <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                        Bid Selected & PO Generated
                                                    </Link>
                                                    <small>
                                                        PO Generated to XYZ Supplier for RFQ 1001
                                                    </small>
                                                    <p className="mb-0 pb-2">
                                                        <small className="text-muted">10 hour ago</small>
                                                    </p>
                                                </div>
                                            </TimelineItem>

                                            <TimelineItem>
                                                <i className=" bg-info-lighten text-info timeline-icon">2</i>
                                                <div className="timeline-item-info">
                                                    <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                        Bid Submitted
                                                    </Link>
                                                    <small>
                                                        XYZ Supplier has submitted bid on RFQ 1001
                                                    </small>
                                                    <p className="mb-0 pb-2">
                                                        <small className="text-muted">13 hours ago</small>
                                                    </p>
                                                </div>
                                            </TimelineItem>

                                            <TimelineItem>
                                                <i className="bg-primary-lighten text-primary timeline-icon">1</i>
                                                <div className="timeline-item-info">
                                                    <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                        RFQ Created
                                                    </Link>
                                                    <small>
                                                        Created RFQ for Ultraline Fly Ash of 20 MT {' '}
                                                    </small>
                                                    <p className="mb-0 pb-2">
                                                        <small className="text-muted">15 hours ago</small>
                                                    </p>
                                                </div>
                                            </TimelineItem>
                                        </Timeline>
                                    </Card.Body>
                                </SimpleBar>


                            </>
                            : title === "Supplier Dashboard" ?
                                <>
                                    <SimpleBar>
                                        <Card.Body>
                                            <Timeline>
                                                <TimelineItem>
                                                    <i className="bg-primary-lighten text-primary timeline-icon">4</i>
                                                    <div className="timeline-item-info">
                                                        <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                            PO Accepted
                                                        </Link>
                                                        <small>
                                                            PO 1234 has been accepted by XYZ Supplier {' '}
                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">5 hours ago</small>
                                                        </p>
                                                    </div>
                                                </TimelineItem>

                                                <TimelineItem>
                                                    <i className="bg-primary-lighten text-primary timeline-icon">3</i>
                                                    <div className="timeline-item-info">
                                                        <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                            PO Received
                                                        </Link>
                                                        <small>
                                                            PO 123 Received from ABC Construction
                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">30 minutes ago</small>
                                                        </p>
                                                    </div>
                                                </TimelineItem>

                                                <TimelineItem>
                                                    <i className="bg-info-lighten text-info timeline-icon">2</i>
                                                    <div className="timeline-item-info">
                                                        <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                            Quote / Bid Submitted
                                                        </Link>
                                                        <small>
                                                            Bid Submitted on RFQ 1001

                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">12 hours ago</small>
                                                        </p>
                                                    </div>
                                                </TimelineItem>

                                                <TimelineItem>
                                                    <i className="bg-primary-lighten text-primary timeline-icon">1</i>
                                                    <div className="timeline-item-info">
                                                        <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                            Received RFQ from
                                                        </Link>
                                                        <small>
                                                            Received RFQ from ABC Construction <br />
                                                            For Ultraline Ash of 20 MT {' '}
                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">14 hours ago</small>
                                                        </p>
                                                    </div>
                                                </TimelineItem>
                                            </Timeline>

                                        </Card.Body>
                                    </SimpleBar>
                                </>
                                :
                                <>
                                    <SimpleBar>
                                        <Card.Body>
                                            <Timeline>
                                                <TimelineItem>
                                                    <i className="bg-primary-lighten text-primary timeline-icon">5</i>
                                                    <div className="timeline-item-info">
                                                        <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                            Trip Created on Order 1002
                                                        </Link>
                                                        <small>
                                                            Trip Created for Truck No. UP10343 Driver Mukesh Kumar{' '}
                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">14 hours ago</small>
                                                        </p>
                                                    </div>
                                                </TimelineItem>
                                                <TimelineItem>
                                                    <i className="bg-primary-lighten text-primary timeline-icon">4</i>
                                                    <div className="timeline-item-info">
                                                        <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                            PO Accepted
                                                        </Link>
                                                        <small>
                                                            PO has been Accepted
                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">8 hour ago</small>
                                                        </p>
                                                    </div>
                                                </TimelineItem>
                                                <TimelineItem>
                                                    <i className="bg-primary-lighten text-primary timeline-icon">3</i>
                                                    <div className="timeline-item-info">
                                                        <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                            PO Received
                                                        </Link>
                                                        <small>
                                                            PO Received on RFQ 1002 from XYZ Supplier
                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">10 hour ago</small>
                                                        </p>
                                                    </div>
                                                </TimelineItem>
                                                <TimelineItem>
                                                    <i className="bg-info-lighten text-info timeline-icon">2</i>
                                                    <div className="timeline-item-info">
                                                        <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                            Quote/Bid Submitted
                                                        </Link>
                                                        <small>
                                                            Bid Submitted on RFQ 1002

                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">13 hours ago</small>
                                                        </p>
                                                    </div>
                                                </TimelineItem>
                                                <TimelineItem>
                                                    <i className="bg-primary-lighten text-primary timeline-icon">1</i>
                                                    <div className="timeline-item-info">
                                                        <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                            Received RFQ
                                                        </Link>
                                                        <small>
                                                            Received RFQ from XYZ Supplier <br />
                                                            for Cement 200 Bags
                                                        </small>
                                                        <p className="mb-0 pb-2">
                                                            <small className="text-muted">15 hours ago</small>
                                                        </p>
                                                    </div>
                                                </TimelineItem>
                                            </Timeline>
                                        </Card.Body>
                                    </SimpleBar >
                                </>
                        }

                    </Card >
                </Col >
            </Row >

            <Row>

                {title === "Fleet Owner Dashboard" ?
                    <>
                        <Col xl={6} lg={12}>
                            <Performers
                                title={"Recent Booking's"}
                                topPerformanceData={recentBookingFleetOwnerData}
                                thead={recentBookingsTheadList}
                            />
                        </Col>
                        <Col xl={6} lg={6}>
                            <Performers title={"Order In-Transit"}
                                topPerformanceData={recentBookingFleetOwnerData}
                                thead={recentBookingsTheadList}
                            />
                        </Col>

                    </>
                    :
                    <>
                        <Col xl={6} lg={12}>
                            <Performers
                                title={"Recent Booking's"}
                                topPerformanceData={recentBookingData}
                                thead={recentBookingsTheadList}
                            />
                        </Col>
                        <Col xl={6} lg={6}>
                            <Performers title={"Recent RFQ's"}
                                topPerformanceData={recentRfqsData}
                                thead={recentRfqsTheadList}
                            />
                        </Col>
                    </>
                }


            </Row>
        </>
    );
};

export default CRMDashboardPage;
