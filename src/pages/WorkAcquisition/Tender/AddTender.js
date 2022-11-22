import React from 'react'
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { FormInput } from '../../../components'
import PageTitle from '../../../components/PageTitle'
import { useForm } from 'react-hook-form';

const AddTender = ({ type }) => {

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

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Tenders', path: '/work-acuquisition/tender' },
                    { label: 'Add Tender', path: '', active: true },
                ]}
                title={type === "view" ? "View Tender" : type === "edit" ? "Edit Tender" : 'Add Tender'}
            />

            <Card>
                <Card.Body>
                    <form onSubmit={handleSubmit()}>
                        <Row>
                            <Col lg={6}>
                                <FormInput
                                    label="Title"
                                    type="text"
                                    name="text"
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="text"
                                    errors={errors}
                                    control={control}
                                />
                            </Col>
                            <Col lg={3}>
                                <Form.Group>
                                    <Form.Label className="">Tender Categories</Form.Label>
                                    <Form.Select className="custom-select" aria-label="Default select example">
                                        <option value="1">Goods</option>
                                        <option value="2">Services</option>
                                        <option value="3">Work</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={3}>
                                <Form.Group>
                                    <Form.Label className="">Tender Type</Form.Label>
                                    <Form.Select className="custom-select" aria-label="Default select example">
                                        <option>Select</option>
                                        <option value="1">Open</option>
                                        <option value="2">Single</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>


                            <Col lg={4}>
                                <FormInput
                                    label="Tender Id"
                                    type="text"
                                    name="email"
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="email"
                                    errors={errors}
                                    control={control}
                                />
                            </Col>
                            <Col lg={4}>
                                <FormInput
                                    label="Reference No"
                                    type="text"
                                    name="password"
                                    placeholder=""
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="password"
                                    errors={errors}
                                    control={control}
                                />
                            </Col>

                            <Col lg={4}>

                                <FormInput
                                    label="Organization"
                                    type="text"
                                    name="organization"
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="placeholder"
                                    errors={errors}
                                    control={control}
                                />
                            </Col>

                            <Col lg={6}>
                                <FormInput
                                    label="Tender Document"
                                    type="file"
                                    name="email"
                                    placeholder="Email"
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="email"
                                    errors={errors}
                                    control={control}
                                />
                            </Col>
                            <Col lg={3}>
                                <FormInput
                                    label="Tender Value (&#8377;)"
                                    type="text"
                                    name="placeholder"
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="placeholder"
                                    errors={errors}
                                    control={control}
                                />
                            </Col>
                            <Col lg={3}>
                                <FormInput
                                    label="Publish Date"
                                    type="date"
                                    name="placeholder"
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="placeholder"
                                    errors={errors}
                                    control={control}
                                />
                            </Col>
                            <Col lg={3}>
                                <FormInput
                                    label="Closing Date"
                                    type="date"
                                    name="closedate"
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="placeholder"
                                    errors={errors}
                                    control={control}
                                />
                            </Col>
                            <Col lg={3}>
                                <FormInput
                                    label="Open Date"
                                    type="date"
                                    name="opendate"
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="placeholder"
                                    errors={errors}
                                    control={control}
                                />
                            </Col>

                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label className="">Assigned To</Form.Label>
                                    <Form.Select className="custom-select" aria-label="Default select example">
                                        <option>Select</option>
                                        <option value="1">Shubham</option>
                                        <option value="2">Kundan</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className='col-auto'>
                        {type === "view" ? "" : type === "edit" ?
                                <Button type="submit" className='float-right'>
                                    Update
                                </Button>
                                :
                                <Button type="submit" className='float-right'>
                                    Add
                                </Button>
                            }
                        </div>
                    </form>
                </Card.Body>
            </Card >

        </>
    )
}

export default AddTender