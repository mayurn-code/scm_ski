import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button } from 'react-bootstrap'
import PageTitle from '../../../components/PageTitle'
import { products } from '../../apps/Ecommerce/Data';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Table from '../../../components/Table';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormInput from '../../../components/FormInput';
import { BiddingDetails, MakeBidApi } from '../../../helpers/api';
import { toast } from 'react-toastify';
import moment from 'moment-timezone';


const MakeBid = () => {
    const { quoteid } = useParams()

    const [bidSubmitForm, setBidSubmitForm] = useState({
        bid_amount: 0,
        remark: null,
    })

    const { bid_amount, remark } = bidSubmitForm;

    const onInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setBidSubmitForm({
            ...bidSubmitForm,
            [name]: value
        })

    }

    const [bidDetails, setBidDetails] = useState({
        quote_value_id: "",
        rfq_for: "Transport",
        published_date: "",
        requested_by: "",
        site_name: null,
        pickup_city: "",
        drop_city: "",
        material_name: "",
        status: false,
        quantity: 0,
        description: "",
        contact_person_name: "",
        email: "",
        mobile: "",
        validity_date: "",
        UOM: ""
    })

    const { quote_value_id, rfq_for, published_date,
        requested_by, site_name, pickup_city, drop_city,
        material_name, status, quantity,
        description, contact_person_name, email, mobile, validity_date, UOM
    } = bidDetails;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!bid_amount || bid_amount === 0) {
            toast.error("Please enter bid amount")
        }
        const data = {
            bid_amount: bid_amount,
            remark: remark,
        }
        MakeBidApi(quoteid, data).then(res => {
            if (res !== undefined) {
                if (res.data.success) {
                    setBidSubmitForm({
                        bid_amount: 0,
                        remark: null,
                    })
                    toast.success("Bid successfully submitted")
                }
            }
        }).catch(e => {
            toast.error(e)

        })
    }



    useEffect(() => {
        loadBidDetails(quoteid)
    }, [])

    const loadBidDetails = (quoteid) => {
        BiddingDetails(quoteid).then(result => {
            if (result !== undefined) {
                if (result) {
                    setBidDetails(result.data.data[0])
                }
            }
        }).catch(e => {
            toast.error(e)
        })
    }



    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Biddings', path: '/work-acuquisition/bidding' },
                    { label: quoteid, path: '', active: true }
                ]}
                title={'Make Bid'}
            />


            <Card>
                <Card.Body>
                    <h4>Request Details</h4>
                    <Row>
                        <Col lg={3} >
                            <h4>Quote Id</h4>
                            <p>{quote_value_id}</p>
                        </Col>
                        <Col lg={3} >
                            <h4>Published On</h4>
                            <p>
                                {published_date ? moment(new Date(published_date)).format("D MMM YYYY") : ""}
                            </p>
                        </Col>
                        <Col lg={3} >
                            <h4>Service</h4>
                            <p>{rfq_for}</p>
                        </Col>
                        <Col lg={3} >
                            <h4>Pick Up</h4>
                            <p>{pickup_city}</p>
                        </Col>
                        <Col lg={3} >
                            <h4>Drop</h4>
                            <p>{drop_city}</p>
                        </Col>
                        <Col lg={3} >
                            <h4>Material</h4>
                            <p>{material_name}</p>
                        </Col>
                        <Col lg={3} >
                            <h4>Quantity</h4>
                            <p>{quantity} {'  '}{UOM} </p>
                        </Col>
                        <Col lg={3} >
                            <h4>Organization/Requested By</h4>
                            <p>{requested_by}</p>
                        </Col>
                        <Col lg={3} >
                            <h4>PO Validity Date</h4>
                            <p>
                                {validity_date ? moment(new Date(validity_date)).format("D MMM YYYY") : ""}
                            </p>
                        </Col>
                        <Col lg={3} >
                            <h4>Contact Person Name</h4>
                            <p>{contact_person_name}</p>
                        </Col>
                        <Col lg={3} >
                            <h4>Mobile</h4>
                            <p>{mobile}</p>
                        </Col>
                        <Col lg={3} >
                            <h4>Email</h4>
                            <p>{email}</p>
                        </Col>
                        <Col lg={12} >
                            <h4>Description</h4>
                            <p>{description}.</p>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <h4>Bid</h4>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={6}>
                                <FormInput
                                    label="Bid Amount Per MT"
                                    type="number"
                                    name="bid_amount"
                                    value={bid_amount}
                                    containerClass={'mb-3'}
                                    onChange={onInputChange}
                                    key="text"

                                />
                            </Col>
                            <Col lg={6}>
                                <FormInput
                                    label="Remark"
                                    type="text"
                                    name="remark"
                                    value={remark}
                                    containerClass={'mb-3'}
                                    onChange={onInputChange}
                                    key="text"

                                />
                            </Col>
                            <Col style={{ textAlign: "right" }} lg={12}>
                                <Button type='submit'>Submit</Button>
                            </Col>

                        </Row>
                    </form>




                </Card.Body>
            </Card>

        </>
    )
}

export default MakeBid;