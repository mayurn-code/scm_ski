import React, { useRef, useEffect, forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../../components';
import classNames from 'classnames';
import Table from '../../../components/Table';
import { quoteData } from '../Data';
import { GetRfqList } from '../../../helpers/api/transport_request/GetRfqList';
import moment from 'moment-timezone';
import { toast } from 'react-toastify';
import { DeleteRfq } from '../../../helpers/api';

const MaterialProcuListRfq = () => {

    const [rfqList, setRfqList] = useState([])
    const [rfqArchiveList, setRfqArchiveList] = useState([])
    const [dataForShow, setDataForShow] = useState([])
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [quoteId, setQuoteId] = useState("");
    const [rfqId, setRfqId] = useState("");
    const [activeBtn, setActiveBtn] = useState('Active')
    const toggle = () => {
        setModal(!modal);
    };


    const openModalWithHeaderClass = (quoteid, id) => {
        setQuoteId(quoteid);
        setRfqId(id);
        toggle();
    };
    const setRfqData = (type) => {
        type === "Active" ? setDataForShow(rfqList) : setDataForShow(rfqArchiveList)
    }




    const rightButtonArr = [{ btn: "Active", func: () => setActiveBtn("Active"), className: "btn btn-success mr-1" }, { btn: "Archived", func: () => setActiveBtn("Archived"), className: "btn btn-danger" }]


    const methods = useForm({
        defaultValues: {
            password: '12345',
            statictext: 'email@example.com',
            color: '#727cf5',
        },
    });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    const loadRfqList = () => {
        setIsLoading(true)
        const type = "Procurement"
        GetRfqList(type).then(result => {
            if (result !== undefined) {
                const response = result.data
                if (response.success) {
                    const archivedList = response.data.filter(item => (item.archieved === true))
                    const rfqList = response.data.filter(item => (item.archieved === false))
                    setRfqArchiveList(archivedList);
                    setRfqList(rfqList);
                    setDataForShow(rfqList)
                    setIsLoading(false)
                }
            }
        })
    }
    useEffect(() => {
        loadRfqList();
    }, [])

    useEffect(() => {
        setRfqData(activeBtn);
    }, [activeBtn])

    const DeleteRfqSubmit = (id) => {
        DeleteRfq(id).then(result => {
            if (result !== undefined) {
                toggle();
                loadRfqList();
                return toast.success("Rfq successfully deleted")
            }
        }).catch();
    }



    const ActionColumn = ({ row }) => {
        return (
            <>
                <Button onClick={() => openModalWithHeaderClass(row.original.quote_value_id, row.original.id)} variant='default'>
                    {' '}
                    <i className="mdi mdi-delete mdi-18px"></i>
                </Button>
            </>
        );
    };

    /* status column render */
    const StatusColumn = ({ row }) => {

        // if archieved === false it is Active
        return (
            <>
                <span
                    className={classNames('badge', {
                        'bg-success': !row.original.archieved,
                        'bg-danger': row.original.archieved,
                    })}>
                    {row.original.archieved ? 'Deactivated' : 'Active'}
                </span>
            </>
        );
    };
    /* status column render */
    const ViewColumn = ({ row }) => {
        return (
            <>
                <Link to="/material-procurement/purchasing-order" className="action-icon">

                    <i className="mdi mdi-eye"></i>
                </Link>
            </>
        );
    };
    /* Publish Date column render */
    const publishDateColumn = ({ row }) => {
        const date = row.original.published_date
        return (
            <>
                { }
                {date ? moment(new Date(date)).format("D MMM YYYY") : ""}
            </>
        );
    };

    /* status column render */
    const bidCountBtnColumn = ({ row }) => {
        const id = row.original.id
        const count = row.original.bid_count
        return (
            <>
                <Link to={`/material-procurement/bid/${id}`} className="btn btn-primary">Bids ({count}) </Link>

            </>
        );
    };

    // get all columns
    const columns = [
        {
            Header: 'Quote Id',
            accessor: 'quote_value_id',
            sort: true
        },
        {
            Header: 'Published On',
            accessor: 'published_date',
            sort: true,
            Cell: publishDateColumn
        },
        {
            Header: 'Material',
            accessor: 'material_name',
            sort: true,
        },
        {
            Header: 'Quantity',
            accessor: 'quantity',
            sort: true,
        },
        {
            Header: 'Bids',
            accessor: 'bids',
            sort: false,
            Cell: bidCountBtnColumn
        },
        {
            Header: 'Status',
            accessor: 'archieved',
            sort: false,
            classes: 'table-action',
            Cell: StatusColumn,
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
            value: dataForShow.length,
        },
    ];



    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'RFQ List'}
            />
            <Card>
                <Card.Body>
                    <Table
                        columns={columns}
                        data={dataForShow}
                        pageSize={5}
                        isLoading={isLoading}
                        sizePerPageList={sizePerPageList}
                        isSortable={true}
                        pagination={true}
                        isSearchable={true}
                        rightButtonArr={rightButtonArr}
                        theadClass="table-light"
                        searchBoxClass="mb-2"
                    />
                </Card.Body>
            </Card >

            <Modal show={modal} onHide={toggle}>
                <Modal.Header
                    onHide={toggle}
                    closeButton
                    className={classNames('modal-colored-header', 'bg-danger')}>
                    <h4 className="modal-title text-light">Delete Rfq</h4>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="mt-0">Are you sure want to delete RFQ - {quoteId}</h5>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggle}>
                        Cancel
                    </Button>{' '}
                    <Button variant="danger" onClick={() => DeleteRfqSubmit(rfqId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MaterialProcuListRfq;