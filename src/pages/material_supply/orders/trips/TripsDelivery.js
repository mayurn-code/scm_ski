import React, { useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { TrackTruckMap } from '../../../../components';
import Table from '../../../../components/Table'
import { ms_tripsData } from './TripsData';

const MaretialSupplyTripsDelivery = ({ orderid }) => {

    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);


    /**
  * Show/hide the modal
  */
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
                    {row.original.driver}
                </p>
                <p >
                    {row.original.drivermobile}
                </p>

            </>
        );
    };

    /* action column render */
    const ActionColumn = ({ row }) => {
        return (
            <>
                <Link to="trip-view" className="action-icon">
                    {' '}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link to="trip-edit" className="action-icon">
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

    // get all columns
    const columns = [
        {
            Header: 'Trip NO.',
            accessor: 'tripno',
            sort: true,
        },
        {
            Header: 'Date',
            accessor: 'date',
            sort: true,
        },
        {
            Header: 'Quantity',
            accessor: 'quantity',
            sort: true,
        },
        {
            Header: 'Truck Details',
            accessor: 'truckdetails',
            sort: true,
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
            value: ms_tripsData.length,
        },
    ];


    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={5}>
                                    <div className="searchBoxClass">
                                        <span className="d-flex align-items-center">
                                            {' '}
                                            <input
                                                value=''
                                                placeholder='Orders'
                                                className="form-control w-auto ms-1"
                                            />
                                            <select className="form-control w-auto ms-1">
                                                <option>Open</option>
                                                <option>Completed</option>
                                                <option>Cancelled</option>
                                            </select>
                                        </span>
                                    </div>
                                </Col>
                                <Col sm={7}>

                                    <div className="text-sm-end">
                                        <Link to={`/transport-booking/orders/${orderid}/trip-add`} className="mb-2 me-1 btn btn-primary">
                                            <i className="dripicons-plus "></i> Add Trip
                                        </Link>
                                    </div>

                                </Col>
                            </Row>

                            <Table
                                columns={columns}
                                data={ms_tripsData}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={false}
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