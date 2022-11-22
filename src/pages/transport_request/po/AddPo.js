// @flow
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormInput } from '../../../components';
import UnitOfMeasurements from '../../../components/componentsDataApis.js/UnitOfMeasurements';
import PageTitle from '../../../components/PageTitle';
import { load_city_list, master_list, PoSubmit, upload_file } from '../../../helpers';

const TranspReqAddPOs = () => {
    const location = useLocation()
    const supplierData = location.state && location.state.objArr
    const filterData = location.state && location.state.filter;
    const [states, setStates] = useState([])
    const [pickupCities, setPickupCities] = useState([])
    const [dropCities, setDropCities] = useState([])
    const [materialName, setMaterialName] = useState('')
    const [materialId, setMaterialId] = useState(0)
    const [fromstateId, setFromStateId] = useState(0)
    const [tostateId, setToStateId] = useState(0)
    const [fromCityId, setFromCityId] = useState(0)
    const [toCityId, setToCityId] = useState(0)
    const [supplierList, setSupplierList] = useState([])

    const [addRfq, setAddRfq] = useState({
        rfq_for: "Transport",
        po_type: "Direct",
        rfq_id: null,
        po_date: "",
        po_number: "",
        po_amount: "",
        quantity: 0,
        bid_rate: null,
        gst_rate: 0,
        site_id: null,
        material_id: 0,
        uom: "",
        selected_vendor_id: 0,
        po_generated_by_id: null,
        po_status: "Pending",
        order_status: "Pending",
        attachment: null,
        po_accepted_date: null,
        pickup_address: "",
        pickup_city_id: 0,
        drop_address: "",
        drop_city_id: 0,
        pickup_state_id: 0,
        drop_state_id: 0
    })

    const { material_id, uom, rfq_for, quantity,
        po_date, po_number, po_amount, bid_rate, gst_rate, rfq_id,
        status, pickup_address, pickup_city_id, drop_address,
        selected_vendor_id,
        drop_city_id, pickup_state_id, drop_state_id } = addRfq;

    const onInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setAddRfq({
            ...addRfq,
            [name]: value
        })
    }

    const loadStates = () => {
        master_list().then(res => {
            if (res !== undefined) {
                if (res.data && res.data.success === true) {
                    const states = res.data.data.states
                    setStates(states.length !== 0 ? states : null)
                }
            }
        })
    }

    const handelLoadCities = (id, type) => {
        load_city_list(id).then(res => {
            if (res !== undefined) {
                if (res.data && res.data.success === true) {
                    const cities = res.data.data
                    const aa = cities.length !== 0 ? cities : []
                    if (type === "pickup") {
                        setPickupCities(aa)
                    }
                    else if (type === "drop") {
                        setDropCities(aa)
                    }
                }
            }
        })
    }

    useEffect(() => {
        loadStates();
        setMaterialName(filterData.materialname)
        setMaterialId(filterData.material_id)
        setFromCityId(filterData.tocityid)
        setToCityId(filterData.tocityid)
        setFromStateId(filterData.fromstateid)
        setToStateId(filterData.tostateid)
        setSupplierList(supplierData);


        const supplierid = supplierData[0].id

        setAddRfq({
            ...addRfq,
            // rfq_vendors: newArr,
            selected_vendor_id: supplierid,
            material_id: filterData.material_id,
            pickup_state_id: filterData.fromstateid,
            drop_state_id: filterData.tostateid,
            pickup_city_id: filterData.fromcityid,
            drop_city_id: filterData.tocityid
        })
        loadStates();

    }, [])

    useEffect(() => {
        if (pickup_state_id) {
            handelLoadCities(pickup_state_id, 'pickup');
            setTimeout(() => {
                setAddRfq({
                    ...addRfq,
                    pickup_city_id: pickup_city_id
                })
            }, 2000);
        }
    }, [pickup_state_id])

    useEffect(() => {
        if (drop_state_id) {
            handelLoadCities(drop_state_id, "drop");
            setTimeout(() => {
                setAddRfq({
                    ...addRfq,
                    drop_city_id: drop_city_id
                })
            }, 2000);
        }
    }, [drop_state_id])

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
        else if (!pickup_address.trim()) {
            return toast.error("Please enter pickup address")
        }
        else if (pickup_state_id === 0 || pickup_state_id === '0') {
            return toast.error("Please choose pickup state")
        }
        else if (pickup_city_id === 0 || pickup_city_id === '0') {
            return toast.error("Please choose pickup city")
        }
        else if (!drop_address.trim()) {
            return toast.error("Please enter drop address")
        }
        else if (drop_state_id === 0 || drop_state_id === '0') {
            return toast.error("Please choose drop state")
        }
        else if (drop_city_id === 0 || drop_city_id === '0') {
            return toast.error("Please choose drop city")
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
                    { label: 'Direct Order', path: '/transport-request/direct-orders' },
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
                                <h4>Transporter</h4>
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
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <FormInput
                                            label="Pickup Address *"
                                            type="text"
                                            name="pickup_address"
                                            value={pickup_address}
                                            onChange={onInputChange}
                                            containerClass={'mb-2'}
                                            key="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Pickup State *</Form.Label>
                                        <Form.Select onChange={onInputChange} name="pickup_state_id" value={pickup_state_id}>
                                            <option value="">Select</option>
                                            {states && states.length !== 0 && states.map(item => (
                                                <option key={item.id + "option"} value={item.id}>{item.state_name + "  (" + item.state_code + ")"}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Pickup City *</Form.Label>
                                        <Form.Select onChange={onInputChange} name="pickup_city_id" value={pickup_city_id}>
                                            <option value="">Select</option>
                                            {pickupCities && pickupCities.length !== 0 && pickupCities.map(item => (
                                                <option key={item.id + "option"} value={item.id}>{item.city_name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <FormInput
                                            label="Drop Address *"
                                            type="text"
                                            name="drop_address"
                                            value={drop_address}
                                            onChange={onInputChange}
                                            containerClass={'mb-2'}
                                            key="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Drop State *</Form.Label>
                                        <Form.Select onChange={onInputChange} name="drop_state_id" value={drop_state_id} >
                                            <option value="">Select</option>
                                            {states && states.length !== 0 && states.map(item => (
                                                <option key={item.id + "option"} value={item.id}>{item.state_name + "  (" + item.state_code + ")"}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Drop City *</Form.Label>
                                        <Form.Select onChange={onInputChange} name="drop_city_id" value={drop_city_id}>
                                            <option value="">Select</option>
                                            {dropCities && dropCities.length !== 0 && dropCities.map(item => (
                                                <option key={item.id + "option"} value={item.id}>{item.city_name}</option>
                                            ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
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
                                </Row>
                                <Row className="mb-3">
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
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>GST in %  *</Form.Label>
                                        <Form.Control type='number' value={gst_rate} name="gst_rate"
                                            onChange={onInputChange}
                                        />
                                    </Form.Group>
                                </Row>
                            </Col>

                            <Col lg={8}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Upload PO</Form.Label>
                                        <Form.Control onChange={handelonFileChange} type="file" Placeholders="Browse" />
                                    </Form.Group>
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


export default TranspReqAddPOs;
