import moment from 'moment-timezone';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TrackTruckMap } from '../../../../components';
import Table from '../../../../components/Table'
import { OrderTripsTranReq } from '../../../../helpers';

const MaretialSupplyTripsDelivery = ({ orderid }) => {

    const [orderTripsList, setOrderTripsList] = useState([])

    
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [tripStatus, setTripsStatus] = useState('Pending')
    const selectFilterList = [
        { value: "Pending", title: "Pending", key: "tripsSelect1" },
        { value: "Scheduled", title: "Scheduled", key: "tripsSelect2" },
        { value: "InTransit", title: "InTransit", key: "tripsSelect3" },
        { value: "Delivered", title: "Delivered", key: "tripsSelect4" }
    ]

    const onChangeFilterFunction = (value) => {
        setTripsStatus(value);
    }

    const selectFilterValues = {
        arrayData: selectFilterList,
        func: onChangeFilterFunction
    }



    /*---------Show/hide the modal-------------*/
    const toggle = () => {
        setModal(!modal);
    };

    /**
     * Opens large modal
     */
    const openModalWithSize = (size) => {
        setSize(size);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    /**
     * Opens modal with custom class
     */
    const openModalWithClass = (className) => {
        setClassName(className);
        toggle();
    };

    const loadTripsList = () => {
        const response = OrderTripsTranReq(orderid, tripStatus);
        response.then(result => {
            const dataResult = result.data.data
            if (dataResult) {
                setOrderTripsList(dataResult);
            } else {
                setOrderTripsList([]);
            }

        }).catch(error => {
            return toast.error(error);
        })
    }

    useEffect(() => {
        loadTripsList();
    }, [tripStatus])


    /*!!!-----------------Column---------------------!!!*/

    /* action column render */
    const DownloadColumn = ({ row }) => {
        return (
            <>
                <Link to="#" className="action-icon">
                    <i className="uil uil-arrow-to-bottom"></i>
                    <div style={{ fontSize: "11px", margin: "0px" }}><p>Challan</p><p> E-Way Bill</p></div>
                </Link>

            </>
        );
    };
    /* action column render */
    const TrackColumn = ({ row }) => {
        return (
            <>
                <Button variant="default" onClick={() => openModalWithClass('modal-70em-width')}>
                    <i className="mdi mdi-go-kart-track mdi-18px"></i>
                </Button>

            </>
        );
    };
    /* Driver column render */
    const DriverDetailsColumn = ({ row }) => {
        return (
            <>
                <p >
                    {row.original.driver_name ? row.original.driver_name : ""}
                </p>
                <p >
                    {/* {row.original.drivermobile} */}
                </p>

            </>
        );
    };
    /* action column render */
    const ActionColumn = ({ row }) => {
        return (
            <>
                <Link to={`trip-view/` + row.original.trip_id} className="action-icon">
                    {' '}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link to={`trip-edit/` + row.original.trip_id} className="action-icon">
                    {' '}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link to="#" className="action-icon">
                    {' '}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </>
        );
    };
    const TruckDetailsColumn = ({ row }) => {
        return (
            <>
                <p>{row.original.truck_number && row.original.truck_number}</p>
                <p>{row.original.truck_type.truck_type && row.original.truck_type.truck_type}</p>
            </>
        );
    };
    const QuantityColumn = ({ row }) => {
        return <>
            {row.original.quantity && row.original.quantity}{' '}{row.original.unit}
        </>

    };
    const TripDateColumn = ({ row }) => {
        return <>
            {row.original.trip_date && moment(new Date(row.original.trip_date)).format("D MMM YYYY")}
        </>

    };

    // get all columns
    const columns = [
        {
            Header: 'Trip NO.',
            accessor: 'trip_id',
            sort: true,
        },
        {
            Header: 'Date',
            accessor: 'trip_date',
            sort: true,
            Cell: TripDateColumn
        },
        {
            Header: 'Quantity',
            accessor: 'quantity',
            sort: true,
            Cell: QuantityColumn
        },
        {
            Header: 'Truck Details',
            accessor: 'truckdetails',
            sort: true,
            Cell: TruckDetailsColumn
        },
        {
            Header: 'Driver Details',
            accessor: 'driver',
            sort: false,
            Cell: DriverDetailsColumn
        },
        {
            Header: 'Status',
            accessor: 'status',
            sort: false,
        },
        {
            Header: 'Track',
            accessor: '',
            sort: false,
            Cell: TrackColumn
        },
        {
            Header: 'Download',
            accessor: 'download',
            sort: false,
            Cell: DownloadColumn
        },
        {
            Header: 'Action',
            accessor: 'action',
            sort: false,
            classes: 'table-action',
            Cell: ActionColumn,
        },
    ];

    // get pagelist to display
    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        {
            text: '10',
            value: 10,
        },
        {
            text: '20',
            value: 20,
        },
        {
            text: 'All',
            value: orderTripsList.length,
        },
    ];


    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Table
                                 selectFilterValues={selectFilterValues}
                                 columns={columns}
                                 data={orderTripsList}
                                 pageSize={5}
                                 sizePerPageList={sizePerPageList}
                                 isSortable={true}
                                 pagination={true}
                                 isSearchable={true}
                                 theadClass="table-light"
                                 searchBoxClass="mb-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
                <Modal.Header onHide={toggle} closeButton>
                    <h4 className="modal-title">Track</h4>
                </Modal.Header>
                <Modal.Body>
                    <TrackTruckMap />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default MaretialSupplyTripsDelivery;