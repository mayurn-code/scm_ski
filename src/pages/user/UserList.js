// @flow
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import classNames from 'classnames';
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import { userdata } from "./Data";
import {
    user_list, user_delete, user_changeStatus
} from '../../helpers/index';
import { Alert } from 'react-bootstrap';
import { DeletePopUp } from '../../components';
import * as XLSX from 'xlsx'
import { toast } from 'react-toastify'
import moment from 'moment-timezone';


// main component
const UserList = (): React$Element<React$FragmentType> => {
    const [userlist, setUserList] = useState([])

    const [userId, setUserId] = useState(0)
    const [modal, setModal] = useState(false);
    const [userName, setUserName] = useState("");

    const toggle = () => {
        setModal(!modal);
    };


    const openModalWithHeaderClass = (name, id) => {
        setUserName(name);
        setUserId(id);
        toggle();
    };


    const loadUserList = () => {
        const response = user_list();
        let resultObj;
        response.then(result => {
            setUserList(result.data.data)
        }).catch(error => {
            return toast.error(error)
            // setErrorMsg(error);
        })
    }

    useEffect(() => {
        loadUserList();
    }, [])

    // OnSubmit Delete Coupon
    const DeleteUserSubmit = (userid) => {
        user_delete(userid).then(result => {
            if (result !== undefined) {
                toggle();
                loadUserList();
                return toast.success("User successfully deleted")
            }
        }).catch();
    }

    const onChangeStatus = (id, status) => {
        const data = {
            id: id,
            status: status
        }
        user_changeStatus(data).then(result => {
            if (result !== undefined) {
                loadUserList();
                return toast.success(`User status changed to ${status ? "Active" : "Deactive"}`)
            }
        }).catch();
    }
    /* status column render */
    const StatusColumn = ({ row }) => {
        return (
            <>
                <Button onClick={() => onChangeStatus(row.original.id, row.original.active ? false : true)}
                    variant={row.original.active ? 'success' : "danger"}>
                    {row.original.active ? 'Active' : 'Deactive'}
                </Button>
            </>
        );
    };
    /* status column render */
    const CreatedAtDateColumn = ({ row }) => {
        return (
            <>
               { moment(new Date(row.original.created_at)).format("YYYY-MM-DD")}
            </>
        );
    };

    /* action column render */
    const ActionColumn = ({ row }) => {
        return (
            <>
                <Link to={"/user/view/" + row.original.id} className="action-icon">
                    {' '}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link to={"/user/edit/" + row.original.id} className="action-icon">
                    {' '}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Button variant="default" onClick={() => openModalWithHeaderClass(row.original.first_name, row.original.id)} className="action-icon">
                    {' '}
                    <i className="mdi mdi-delete"></i>
                </Button>
            </>
        );
    };



    // get all columns
    const columns = [
        {
            Header: 'Name',
            accessor: 'first_name',
            sort: true,
        },
        {
            Header: 'Mobile',
            accessor: 'mobile',
            sort: true,
        },
        {
            Header: 'E-mail',
            accessor: 'email',
            sort: true,
        },
        {
            Header: 'Type',
            accessor: 'user_type',
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'active',
            sort: true,
            Cell: StatusColumn,
        },
        {
            Header: 'Added On',
            accessor: 'created_at',
            sort: true,
            Cell:CreatedAtDateColumn

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
            value: userlist.length,
        },
    ];

    const handelOnExport = () => {
        var wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(userlist)

        XLSX.utils.book_append_sheet(wb, ws, "userlist");
        XLSX.writeFile(wb, "userlist.xlsx")
    }
    return (
        <>

            {/* {errorMsg && (
                <Alert variant="danger" className="my-2">
                    {errorMsg}
                </Alert>
            )} */}
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Users'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={5}>
                                    <Link to="/user/add" className="btn btn-success mb-2">
                                        <i className="dripicons-plus me-1"></i>Add User
                                    </Link>
                                </Col>

                                <Col sm={7}>
                                    <div className="text-sm-end">
                                        <Button variant="light" className="mb-2 me-1">
                                            Import
                                        </Button>

                                        <Button variant="light" onClick={() => handelOnExport()} className="mb-2">
                                            Export
                                        </Button>
                                    </div>
                                </Col>
                            </Row>

                            <Table
                                columns={columns}
                                data={userlist}
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
            <Modal show={modal} onHide={toggle}>
                <Modal.Header
                    onHide={toggle}
                    closeButton
                    className={classNames('modal-colored-header', 'bg-danger')}>
                    <h4 className="modal-title text-light">Delete User</h4>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="mt-0">Are you sure want to delete user - {userName}</h5>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggle}>
                        Cancel
                    </Button>{' '}
                    <Button variant="danger" onClick={() => DeleteUserSubmit(userId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserList;