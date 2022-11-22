// @flow
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormInput } from '../../../components';
import UnitOfMeasurements from '../../../components/componentsDataApis.js/UnitOfMeasurements';
import PageTitle from '../../../components/PageTitle';
import { PoSubmit, SiteList, upload_file } from '../../../helpers';

const MaterialProcuPurchasingOrder = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const supplierData = location.state && location.state.objArr
    const [siteLocations, setSiteLocations] = useState([])
    const filterData = location.state && location.state.filter;

    const [materialName, setMaterialName] = useState('')


    const [addRfq, setAddRfq] = useState({
        rfq_for: "Procurement",
        po_type: "Direct",
        rfq_id: null,
        po_date: "",
        po_number: "",
        po_amount: null,
        quantity: 0,
        bid_rate: null,
        gst_rate: 0,
        site_id: 0,
        material_id: 0,
        uom: "",
        selected_vendor_id: 0,
        po_generated_by_id: null,
        po_status: "Pending",
        order_status: "Pending",
        attachment: null,
        po_accepted_date: null,
        pickup_address: null,
        pickup_city_id: null,
        drop_address: null,
        drop_city_id: null,
        pickup_state_id: null,
        drop_state_id: null
    })

    const { material_id, uom, quantity,
        po_date, po_number, po_amount, gst_rate,
        site_id,
        selected_vendor_id,
    } = addRfq;

    const onInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setAddRfq({
            ...addRfq,
            [name]: value
        })
    }



    useEffect(() => {
        setMaterialName(filterData.materialname)
        const supplierid = supplierData[0].id
        setAddRfq({
            ...addRfq,
            selected_vendor_id: supplierid,
            material_id: filterData.material_id,
            // this is wrong
            site_id: filterData.fromstateid //---For now I am attaching state id to site Id
        })
        loadSite();

    }, [])
    const loadSite = () => {
        SiteList().then(res => {
            if (res !== undefined) {
                setSiteLocations(res.data.data)
            }
        })
    }


    /* handel file change*/
    const handelonFileChange = (e) => {
        const data = {
            UploadFor: "PO",
            file: e.target.files[0]
        }
        const response = upload_file(data);
        response.then(res => {
            if (res.data) {
                const status = res.data.success
                const data = res.data.data
                const message = res.data.message
                if (status === true) {
                    const filepath = data.file_path
                    if (filepath) {
                        setAddRfq({
                            ...addRfq,
                            attachment: filepath
                        })
                    }
                } else if (status == false) {
                    return toast.error(message)
                }
            }
        })
    }

    const submitAddDirectPo = (e) => {
        e.preventDefault();
        if (material_id === 0) {
            return toast.error("Please enter material id")
        }
        else if (selected_vendor_id === 0) {
            return toast.error("Please enter vender id")
        }

        else if (!uom) {
            return toast.error("Please choose unit")
        }
        else if (!quantity) {
            return toast.error("Please enter quantity")
        }
        else if (!po_date) {
            return toast.error("Please enter po date")
        }
        else if (!po_number) {
            return toast.error("Please enter po number")
        }
        else if (!po_amount) {
            return toast.error("Please enter po amount")
        }
        else if (!gst_rate) {
            return toast.error("Please enter gst rate")
        } else {
            const response = PoSubmit(addRfq);
            response.then(res => {
                if (res.data) {
                    if (res.data.success) {
                        navigate("/material-procurement/direct-orders")
                        return toast.success("Po generated successfully")
                    } else {
                        return toast.error("Something went wrong")
                    }
                }
            }).catch(e => {
                return toast.error(e)
            })
        }
    }

    return (

        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Direct Order', path: '/material-procurement/direct-orders' },
                    { label: 'Add Pos', path: '', active: true },
                ]}
                title={'Add PO'}
            />
            <Card>
                <Card.Body>
                    <h4>Direct PO</h4>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <h4>Material</h4>
                            <p>{materialName && materialName}</p>
                        </div>
                        <div className='col-lg-6'>
                            <>
                                <h4>Supplier</h4>
                                {supplierData.map(item => (
                                    <>
                                        <p>{item.supplier}</p>
                                    </>
                                ))}
                            </>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <h4>PO Details</h4>
                    <form onSubmit={submitAddDirectPo}>
                        <Row>
                            <Col lg={12}>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Site Location *</Form.Label>
                                        <Form.Select className="custom-select" onChange={onInputChange} value={site_id} name="site_id">
                                            <option value="">Select</option>
                                            {siteLocations && siteLocations.map(item => (
                                                <option value={item.id}>{item.site_name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Unit *</Form.Label>
                                        <UnitOfMeasurements value={uom} name="uom" onChange={onInputChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <FormInput
                                            onChange={onInputChange}
                                            label="Quantity *"
                                            type="number"
                                            name="quantity"
                                            value={quantity}
                                            containerClass={'mb-3'}
                                            key="text"
                                        />
                                    </Form.Group>

                                </Row>
                                <Row className="mb-3">

                                    <Form.Group as={Col} controlId="formGridCity">
                                        <FormInput
                                            onChange={onInputChange}
                                            label="Po Date *"
                                            type="date"
                                            name="po_date"
                                            value={po_date}
                                            containerClass={'mb-3'}
                                            key="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>PO Number *</Form.Label>
                                        <Form.Control value={po_number} name="po_number" type='text'
                                            onChange={onInputChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>PO Value (Amount) *</Form.Label>
                                        <Form.Control type='number' value={po_amount} name="po_amount"
                                            onChange={onInputChange}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>GST in %  *</Form.Label>
                                        <Form.Control type='number' value={gst_rate} name="gst_rate"
                                            onChange={onInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Upload PO</Form.Label>
                                        <Form.Control onChange={handelonFileChange} type="file" Placeholders="Browse" />
                                    </Form.Group>
                                </Row>
                            </Col>

                            <Col lg={8}>
                                <Row className="mb-3">

                                </Row>
                            </Col>
                        </Row>

                        {/* </div> */}
                        <Button variant="primary" type="submit">
                            Send PO
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        </>
    );
};


export default MaterialProcuPurchasingOrder;