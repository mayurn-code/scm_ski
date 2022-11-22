import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FormInput } from '../../components'
import { useForm } from 'react-hook-form';

const EditMyProfile = () => {

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

            <Card>
                <Card.Body>
                    <h4 className="header-title">Input Types</h4>
                    <p className="text-muted">
                        Most common form control, text-based input fields. Includes support for all HTML5 types:{' '}
                        <code>text</code>, <code>password</code>, <code>datetime</code>, <code>datetime-local</code>,{' '}
                        <code>date</code>, <code>month</code>, <code>time</code>, <code>week</code>, <code>number</code>
                        , <code>email</code>, <code>url</code>, <code>search</code>, <code>tel</code>, and{' '}
                        <code>color</code>.
                    </p>
                    <Row>
                        <Col lg={12}>
                            <form onSubmit={handleSubmit()}>
                                <FormInput
                                    label="Text"
                                    type="text"
                                    name="text"
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="text"
                                    errors={errors}
                                    control={control}
                                />

                                <FormInput
                                    label="Email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="email"
                                    errors={errors}
                                    control={control}
                                />

                                <FormInput
                                    label="Show/Hide Password"
                                    type="password"
                                    name="password"
                                    placeholder=""
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="password"
                                    errors={errors}
                                    control={control}
                                />

                                <FormInput
                                    label="Placeholder"
                                    type="text"
                                    name="placeholder"
                                    placeholder="placeholder"
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="placeholder"
                                    errors={errors}
                                    control={control}
                                />

                                <FormInput
                                    label="Text Area"
                                    type="textarea"
                                    name="textarea"
                                    rows="5"
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="textarea"
                                    errors={errors}
                                    control={control}
                                />

                                <FormInput
                                    label="Read only"
                                    type="text"
                                    name="text1"
                                    id="text1"
                                    placeholder="Readonly value"
                                    readOnly
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="text1"
                                    errors={errors}
                                    control={control}
                                />

                                <FormInput
                                    label="Disabled"
                                    type="text"
                                    name="text2"
                                    id="text2"
                                    placeholder="Disabled value"
                                    disabled
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="text2"
                                    errors={errors}
                                    control={control}
                                />

                                <FormInput
                                    label="Static control"
                                    type="text"
                                    name="statictext"
                                    placeholder="Disabled"
                                    plaintext
                                    readOnly
                                    containerClass={'mb-3'}
                                    register={register}
                                    key="statictext"
                                    errors={errors}
                                    control={control}
                                />

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="text3" className="form-label">
                                        Helping text
                                    </Form.Label>
                                    <Form.Control type="text" name="text" id="text3" placeholder="Helping text" />
                                    <Form.Text>
                                        A block of help text that breaks onto a new line and may extend beyond one line.
                                    </Form.Text>
                                </Form.Group>
                                <Button type="button">Update</Button>
                            </form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default EditMyProfile