import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button } from 'react-bootstrap'
import PageTitle from '../../../components/PageTitle'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Table from '../../../components/Table';
import { BiddingList } from '../../../helpers/api';
import moment from 'moment-timezone';
import { toast } from 'react-toastify';




const Bidding = () => {

    const [biddingList, setBiddingList] = useState([])
    const [dataForShow, setDataForShow] = useState([])
    const [activeList, setActiveList] = useState([])
    const [archiveList, setArchiveList] = useState([])
    const [activeBtn, setActiveBtn] = useState('Active')

    const setRfqData = (type) => {
        type === "Active" ? setDataForShow(activeList) : setDataForShow(archiveList)
    }

    const rightButtonArr = [{ btn: "Active", func: () => setActiveBtn("Active"), className: "btn btn-success mr-1" }, { btn: "Archived", func: () => setActiveBtn("Archived"), className: "btn btn-danger" }]


    useEffect(() => {
        setRfqData(activeBtn);
    }, [activeBtn])
    useEffect(() => {
        loadBiddingList();
    }, [])

    const loadBiddingList = () => {
        BiddingList().then(res => {
            if (res !== undefined) {
                if (res.data.success) {
                    const result = res.data.data
                    const activeUser = result.filter(item => item.validity_date && new Date(item.validity_date) >= new Date())
                    const archiveUser = result.filter(item => item.validity_date && new Date(item.validity_date) < new Date())
                    setDataForShow(activeUser)
                    setActiveList(activeUser)
                    setArchiveList(archiveUser)
                    setBiddingList(res.data.data)
                }
            }
        }).catch(e => {
            toast.error(e)
        })
    }


    // 
    const BidColumn = ({ row }) => {
        return (
            <>
                <Link to={"/work-acuquisition/" + row.original.quote_id} className="btn btn-primary">Bid</Link>
            </>
        );
    };

    /* status column render */
    const StatusColumn = ({ row }) => {
        return (
            <>
                <span
                    className={`${new Date(row.original.validity_date) >= new Date() ? 'badge bg-success' : "badge bg-danger"}`}>
                    {new Date(row.original.validity_date) >= new Date() ? 'Active' : 'Deactivated'}
                </span>
            </>
        );
    };

    const PublishedDateColumn = ({ row }) => {
        return (
            <>
                {row.original.published_date && moment(new Date(row.original.published_date)).format("D MMM YYYY")}
            </>
        );
    }
    const LocationColumn = ({ row }) => {
        return (
            <>
                {"Pickup City : " + row.original.pickup_city && row.original.pickup_city}
                <br />
                {"Drop City : " + row.original.drop_city && row.original.drop_city}
            </>
        );
    }

    // get all columns
    const columns = [
        {
            Header: 'Quote Id',
            accessor: 'quote_value_id',
            sort: true,

        },
        {
            Header: 'Service',
            accessor: 'rfq_for',
            sort: true,
        },
        {
            Header: 'Published On',
            accessor: 'published_date',
            sort: true,
            Cell: PublishedDateColumn
        },
        {
            Header: 'Requested By',
            accessor: 'requested_by',
            sort: true,
        },

        {
            Header: 'Site/Location',
            accessor: 'pickup_city',
            sort: true,
            Cell: LocationColumn
        },
        {
            Header: 'Material',
            accessor: 'material_name',
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'status',
            sort: true,
            Cell: StatusColumn,
        },
        {
            Header: 'Bid',
            accessor: 'bid',
            sort: true,
            Cell: BidColumn,
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
            value: dataForShow.length,
        },
    ];
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Bidding'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={dataForShow}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                rightButtonArr={rightButtonArr}
                                // isSelectable={true}
                                isSearchable={true}
                                theadClass="table-light"
                                searchBoxClass="mb-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Bidding;