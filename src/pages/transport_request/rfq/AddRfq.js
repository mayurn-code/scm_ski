import React, { useRef, useEffect, forwardRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../../components';
import classNames from 'classnames';
import { useState } from 'react';
import { AddRfq, load_city_list, load_state_list, master_list } from '../../../helpers';
import UnitOfMeasurements from '../../../components/componentsDataApis.js/UnitOfMeasurements';
import { toast } from 'react-toastify';
import TransporterListComp from '../fleets/TransporterList';

const TranspReqAddRfq = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const materialData = location.state && location.state.objArr
    const filterData = location.state && location.state.filter;
    const [materialName, setMaterialName] = useState("")
    const [tempCityPickupId, setTempCityPickupId] = useState("")
    const [tempcityDropId, setTempcityDropId] = useState("")
    const [supplier, setSupplier] = useState([])
    const [states, setStates] = useState([])
    const [pickupCities, setPickupCities] = useState([])
    const [dropCities, setDropCities] = useState([])
    const [addRfq, setAddRfq] = useState({
        material_id: 0,
        UOM: "",
        site_id: null,
        rfq_for: "Transport",
        quantity: null,
        payment_terms: null,
        quote_date: "",
        validity_date: "",
        description: "",
        status: "Pending",
        pickup_address: "",
        pickup_city_id: 0,
        drop_address: "",
        drop_city_id: 0,
        pickup_state_id: 0,
        drop_state_id: 0,
        archieved: false,
        rfq_vendors: []
    })

    const { material_id, UOM, site_id, rfq_for, quantity,
        payment_terms, quote_date, validity_date, description,
        status, pickup_address, pickup_city_id, drop_address, drop_city_id,
        pickup_state_id, drop_state_id, archieved, rfq_vendors } = addRfq;

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
        const materialname = filterData.materialname
        const material_id = filterData.material_id
        const fromcityid = filterData.fromcityid
        const fromstateid = filterData.fromstateid
        const tocityid = filterData.tocityid
        const tostateid = filterData.tostateid
        setMaterialName(materialname ? materialname : "")
        setTempCityPickupId(fromcityid);
        setTempcityDropId(tocityid);
        setSupplier(materialData);

        let newArr = []

        for (var item of materialData) {
            newArr.push({
                "vendor_id": item.id
            })
        }

        setAddRfq({
            ...addRfq,
            rfq_vendors: newArr,
            material_id: material_id,
            pickup_state_id: fromstateid,
            drop_state_id: tostateid,
            pickup_city_id: fromcityid,
            drop_city_id: tocityid
        })
    },[])


    const handleRemoveItem = (index) => {
        if (supplier.length > 1) {
            const newList = supplier.filter((item) => item.id !== index);
            setSupplier(newList);
            let newArr = []
            for (var item of newList) {
                newArr.push({
                    "vendor_id": item.id
                })
            }
            setAddRfq({
            ...addRfq,
                rfq_vendors: newArr
            })
        } else {
            toast.error("At least one transporter required, You can not remove !")
        }

    };


    // Submit Form
    const handleSubmit = (event) => {
        event.preventDefault();
        if (material_id === 0) {
            return toast.error("Material id required")
        }
        else if (!pickup_address.trim()) {
            return toast.error("Please enter pickup address")
        }
        else if (!pickup_state_id) {
            return toast.error("Please select pickup state")
        }
        else if (pickup_city_id == 0) {
            return toast.error("Please select pickup city")
        }
        else if (!drop_address.trim()) {
            return toast.error("Please enter drop address")
        }
        else if (drop_state_id == 0) {
            return toast.error("Please select drop state")
        }
        else if (drop_city_id == 0) {
            return toast.error("Please select drop city")
        }
        else if (!UOM.trim()) {
            return toast.error("Please select unit")
        }
        else if (!quantity) {
            return toast.error("Please enter quantity")
        }
        else if (!payment_terms) {
            return toast.error("Please enter payment terms")
        }
        else if (!quote_date) {

            return toast.error("Please select quote date")
        }
        else if (!validity_date) {
            return toast.error("Please select validity date")

        }
        else if (rfq_vendors.length === 0) {
            return toast.error("At least one transporter required")
        } else {
            AddRfq(addRfq).then(result => {
                if (result !== undefined) {
                    if (result.data.success) {
                        toast.success(result.data.message)
                        return navigate("/transport-request/rfq");
                    }
                }
            })
        }
    }

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

    const handelAddMoreTranspoter = () => {
        const ePickup = document.getElementsByName("pickup_city_id")[0]
        const valuePickupCity = ePickup.value;
        const namePickupCity = ePickup.options[ePickup.selectedIndex].text;
        const eDrop = document.getElementsByName("drop_city_id")[0]
        const valueDropCity = eDrop.value;
        const nameDropCity = eDrop.options[eDrop.selectedIndex].text;
        const data = {
            selectedSupplierData: supplier,
            materialid: material_id,
            materialName: materialName,
            pickupcityid: valuePickupCity,
            pickupStateid: pickup_state_id,
            pickupcityName: namePickupCity,
            dropcityid: valueDropCity,
            dropcityName: nameDropCity,
            dropStateid: drop_state_id,
        }
        navigate("/transport-request/create-rfq",
            {
                state: data
            })
    }


    const onCityChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setAddRfq({
            ...addRfq,
            [name]: value
        })
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Create RFQ', path: '/transport-request/create-rfq' },
                    { label: 'New Request For Quote', path: '', active: true },

                ]}
                title={'New Request For Quote'}
            />
            <Card>
                <Card.Body>
                    <h4 className="header-title mt-0 mb-2">Material</h4>
                    <div>
                        <p>{materialName ? materialName : ""}</p>
                    </div>
                    <h4 className="header-title mt-2 mb-2">Transporter</h4>
                    <div className='transportAlert'>
                        {supplier.map((item, index) => (
                            <div key={item.id + "supplier"} className="trnsList">
                                <Alert
                                    variant=""
                                    className={classNames('bg-light', 'text-dark')}
                                    onClose={() => handleRemoveItem(item.id)}
                                    dismissible>
                                    {item.supplier}
                                </Alert>
                            </div>
                        ))}
                        <Button onClick={handelAddMoreTranspoter} className=''><i className="dripicons-plus" /></Button>
                    </div>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={4}>
                                <FormInput
                                    onChange={onInputChange}
                                    label="Pickup Address *"
                                    type="text"
                                    name="pickup_address"
                                    containerClass={'mb-3'}
                                    value={pickup_address}
                                    key="text"
                                />
                            </Col>

                            <Col lg={4}>
                                <Form.Group>
                                    <Form.Label className="">Pickup State *</Form.Label>
                                    <Form.Select onChange={onInputChange} className="custom-select" name="pickup_state_id" value={pickup_state_id}>
                                        <option value="">Select</option>
                                        {states && states.length !== 0 && states.map(item => (
                                            <option key={item.id + "option"} value={item.id}>{item.state_name + "  (" + item.state_code + ")"}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group>
                                    <Form.Label className="">Pickup City *</Form.Label>
                                    <Form.Select onChange={onCityChange} className="custom-select" name="pickup_city_id" value={pickup_city_id} >
                                        <option value="">Select</option>
                                        {pickupCities && pickupCities.length !== 0 && pickupCities.map(item => (
                                            <option key={item.id + "option"} value={item.id}>{item.city_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <div className='mt-2'></div>
                            <Col lg={4}>
                                <FormInput
                                    onChange={onInputChange}
                                    label="Drop Address *"
                                    type="text"
                                    value={drop_address}
                                    name="drop_address"
                                    containerClass={'mb-3'}
                                    key="text"
                                />

                            </Col>

                            <Col lg={4}>
                                <Form.Group>
                                    <Form.Label className="">Drop State *</Form.Label>
                                    <Form.Select onChange={onInputChange} name="drop_state_id" value={drop_state_id} className="custom-select" >
                                        <option value="">Select</option>
                                        {states.map(item => (
                                            <option key={item.id + "option"} value={item.id}>{item.state_name + "  (" + item.state_code + ")"}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group>
                                    <Form.Label className="">Drop City *</Form.Label>
                                    <Form.Select onChange={onCityChange} className="custom-select" name="drop_city_id" value={drop_city_id} >
                                        <option value="">Select</option>
                                        {dropCities && dropCities.length !== 0 && dropCities.map(item => (
                                            <option key={item.id + "option"} value={item.id}>{item.city_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <div className='mt-2'></div>
                            <Col lg={4}>
                                <Form.Group>
                                    <Form.Label className="">Unit *</Form.Label>
                                    <UnitOfMeasurements value={UOM} name="UOM" onChange={onInputChange} />

                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <FormInput
                                    onChange={onInputChange}
                                    value={quantity}
                                    label="Quantity *"
                                    type="number"
                                    name="quantity"
                                    value={quantity}
                                    containerClass={'mb-3'}
                                />
                            </Col>
                            <Col lg={4}>
                                <FormInput
                                    label="Payment Terms (In days) *"
                                    type="number"
                                    onChange={onInputChange}
                                    value={payment_terms}
                                    name="payment_terms"
                                    containerClass={'mb-3'}
                                />
                            </Col>
                            <div className='mt-2'></div>
                            <Col lg={4}>
                                <FormInput
                                    label="Quote Date *"
                                    type="date"
                                    onChange={onInputChange}
                                    name="quote_date"
                                    value={quote_date}
                                    containerClass={'mb-3'}
                                    key="text"
                                />
                            </Col>
                            <Col lg={4}>
                                <FormInput
                                    label="Validity Date *"
                                    type="date"
                                    onChange={onInputChange}
                                    name="validity_date"
                                    value={validity_date}
                                    containerClass={'mb-3'}
                                    key="text"
                                />
                            </Col>
                            <Col lg={12}>
                                <FormInput
                                    label="Descriptions"
                                    type="textarea"
                                    onChange={onInputChange}
                                    name="description"
                                    value={description}
                                    containerClass={'mb-3'}
                                    key="text"
                                />
                            </Col>
                        </Row>
                        <div className='col-auto'>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Card.Body>
            </Card >

        </>
    )
}

export default TranspReqAddRfq;