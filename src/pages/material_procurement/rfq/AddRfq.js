import React, { useRef, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import { FormInput } from '../../../components';
import classNames from 'classnames';
import { AddRfqMaterialProcu, SiteList } from '../../../helpers/api';
import UnitOfMeasurements from '../../../components/componentsDataApis.js/UnitOfMeasurements';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const MaterialProcuAddRfq = () => {
    const location = useLocation()

    const navigate = useNavigate()
    const [siteLocations, setSiteLocations] = useState([])
    const supplierData = location.state && location.state.objArr
    const filterData = location.state && location.state.filter;
    const [supplier, setSupplier] = useState([])
    const [materialName, setMaterialName] = useState("")

    const [addRfqForm, setAddRfqForm] = useState({
        material_id: null,
        UOM: "TONS",
        site_id: null,
        rfq_for: "Procurement",
        quantity: null,
        payment_terms: null,
        quote_date: null,
        validity_date: null,
        description: "",
        status: "Pending",
        pickup_address: null,
        pickup_city_id: null,
        drop_address: null,
        drop_city_id: null,
        pickup_state_id: null,
        drop_state_id: null,
        archieved: false,
        rfq_vendors: [
        ]
    })
    const { material_id, UOM, site_id, quantity, payment_terms, quote_date, validity_date, description, rfq_vendors } = addRfqForm;


    const onInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setAddRfqForm({
            ...addRfqForm,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!site_id) {
            return toast.error("Please select site")
        }
        else if (!UOM) {
            return toast.error("Please select unit")
        }
        else if (!quantity) {
            return toast.error("Please enter quantity")
        }
        else if (!payment_terms) {
            return toast.error("Please enter payment terms")
        }
        else if (!quote_date) {
            return toast.error("Please enter quote date")
        }
        else if (!validity_date) {
            return toast.error("Please enter validity date")
        }
        else {
            AddRfqMaterialProcu(addRfqForm).then(res => {
                if (res !== undefined) {
                    if (res.data.success) {
                        toast.success("RFQ successfully created")
                        navigate("/material-procurement/rfq")
                    }
                }
            }).catch(e => {
                toast.error(e)
            })
        }
    }


    const handleClose = (index) => {
        // const list = [...colors];
        // list.splice(index, 1);
        // setColors(list);
    };
    const loadSite = () => {
        SiteList().then(res => {
            if (res !== undefined) {
                setSiteLocations(res.data.data)
            }
        })
    }

    useEffect(() => {
        const materialid = filterData.material_id
        const materialname = filterData.materialname
        let arr = [];

        setSupplier(supplierData);

        console.log(filterData, '------')
        console.log(supplierData, '------')

        setMaterialName(materialname ? materialname : "")

        supplierData.forEach(element => {
            arr.push({
                "vendor_id": element.id
            })
        })
        setAddRfqForm({
            ...addRfqForm,
            material_id: materialid,
            rfq_vendors: arr,
            site_id: filterData.fromstateid
        })
        loadSite()
    }, [])


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
            setAddRfqForm({
                ...addRfqForm,
                rfq_vendors: newArr
            })
        } else {
            toast.error("At least one transporter required, You can not remove !")
        }

    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Supplier', path: '/material-procurement/supplier' },
                    { label: 'New Request For Quote', path: '', active: true }
                ]}
                title={'New Request For Quote'}
            />
            <Card>
                <Card.Body>
                    <h4 className="header-title mt-0 mb-2">Material</h4>
                    <div>
                        <p>{materialName}</p>
                    </div>
                    <h4 className="header-title mt-3 mb-2">Suppliers</h4>
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
                        {/* <Button onClick={handelAddMoreTranspoter} className=''><i className="dripicons-plus" /></Button> */}
                    </div>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <form onSubmit={handleSubmit}>
                        <Row>

                            <Col lg={4}>
                                <Form.Group>
                                    <Form.Label className="">Site Location *</Form.Label>
                                    <Form.Select className="custom-select" onChange={onInputChange} value={site_id} name="site_id">
                                        <option value="">Select</option>
                                        {siteLocations && siteLocations.map(item => (
                                            <option value={item.id}>{item.site_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group>
                                    <Form.Label className="">Unit *</Form.Label>
                                    <UnitOfMeasurements value={UOM} name="UOM" onChange={onInputChange} />

                                </Form.Group>
                            </Col>

                            <Col lg={4}>
                                <FormInput
                                    value={quantity}
                                    name="quantity"
                                    onChange={onInputChange}
                                    label="Quantity *"
                                    type="number"

                                    containerClass={'mb-3'}

                                />
                            </Col>
                            <Col lg={4}>
                                <FormInput
                                    value={payment_terms}
                                    name="payment_terms"
                                    onChange={onInputChange}
                                    label="Payment Terms (In days) *"
                                    type="number"
                                    containerClass={'mb-3'}

                                />
                            </Col>
                            <Col lg={4}>
                                <FormInput
                                    label="Quote Date *"
                                    type="date"
                                    value={quote_date}
                                    name="quote_date"
                                    onChange={onInputChange}
                                    containerClass={'mb-3'}
                                />
                            </Col>
                            <Col lg={4}>
                                <FormInput
                                    value={validity_date}
                                    name="validity_date"
                                    onChange={onInputChange}
                                    label="Validity Date *"
                                    type="date"
                                    containerClass={'mb-3'}

                                />
                            </Col>
                            <Col lg={12}>
                                <FormInput
                                    label="Descriptions"
                                    type="textarea"
                                    value={description}
                                    name="description"
                                    onChange={onInputChange}
                                    containerClass={'mb-3'}
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

export default MaterialProcuAddRfq;