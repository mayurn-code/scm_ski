import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table from '../../../../components/Table';
import { order_trips_list, order_trip_delete } from '../../../../helpers/api/orderManagment';
import { toast } from 'react-toastify';
import { TrackTruckMap } from '../../../../components';
import moment from 'moment-timezone';
import classNames from 'classnames';

const TransportBookingTripsDelivery = ({ orderid, tripsData }) => {

    const [orderTripsList, setOrderTripsList] = useState([])


    const [modal, setModal] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [tripId, setTripid] = useState(0)
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [tripStatus, setTripsStatus] = useState('Pending')
    const [isLoading, setIsLoading] = useState(false)
    const rightButtonObj = { link: "trip-add", title: "Add Trip", state: tripsData }
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
    const toggleDelete = () => {
        setModalDelete(!modalDelete);
    };

    /*
      Opens large modal
    */
    const openModalWithSize = (size) => {
        setSize(size);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    /*
     Opens modal with custom class
     */
    const openModalDeleteModal = (tripid) => {
        setTripid(tripid);
        toggleDelete();
    }
    const openModalWithClass = (className) => {
        setClassName(className);
        toggle();
    };

    const loadTripsList = () => {
        setIsLoading(true)
        const response = order_trips_list(orderid, tripStatus);
        response.then(result => {
            const dataResult = result.data.data
            if (dataResult) {
                setOrderTripsList(dataResult);
                setIsLoading(false)
            } else {
                setOrderTripsList([]);
                setIsLoading(false)
            }

        }).catch(error => {
            setOrderTripsList([]);
            setIsLoading(false)
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
                {row.original.challan &&
                    <Link to={row.original.challan ? "" + row.original.challan : ""} className="action-icon" download={true}>
                        <i className="uil uil-arrow-to-bottom"></i>
                        <div style={{ fontSize: "11px", margin: "0px" }}><p>Challan</p></div>
                    </Link>
                }
                {row.original.e_way_bill &&
                    <Link to={row.original.e_way_bill ? "" + row.original.e_way_bill : ""} className="action-icon" download={true}>
                        <i className="uil uil-arrow-to-bottom"></i>
                        <div style={{ fontSize: "11px", margin: "0px" }}><p> E-Way Bill</p></div>
                    </Link>
                }

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
                <Link to={`trip-edit/` + row.original.trip_id} state={{ state: tripsData }} className="action-icon">
                    {' '}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Button onClick={() => openModalDeleteModal(row.original.trip_id)} variant={"default"}>
                    {' '}
                    <i className="mdi mdi-delete mdi-18px"></i>
                </Button>
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

    const DeleteTripSubmit = (id) => {
        order_trip_delete(orderid, id).then(res => {
            const result = res.data
            if (result !== undefined) {
                if (result.success) {
                    toast.success("Trip successfully deleted")
                    toggleDelete();
                    loadTripsList();
                }
            }
        })

    }


    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>

                            <Table
                                selectFilterValues={selectFilterValues}
                                rightButton={rightButtonObj}
                                columns={columns}
                                isLoading={isLoading}
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

            <Modal show={modalDelete} onHide={toggleDelete}>
                <Modal.Header
                    onHide={toggleDelete}
                    closeButton
                    className={classNames('modal-colored-header', 'bg-danger')}>
                    <h4 className="modal-title text-light">Delete Trip</h4>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="mt-0">Are you sure want to delete trip</h5>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggleDelete}>
                        Cancel
                    </Button>{' '}
                    <Button variant="danger" onClick={() => DeleteTripSubmit(tripId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

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

export default TransportBookingTripsDelivery;