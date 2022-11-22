// @flow
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Button, Alert, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// actions
import { resetAuth, signupUser } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components';

import AccountLayout from './AccountLayout';


const RegisterStep2 = (): React$Element<React$FragmentType> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, userSignUp, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            organizationname: yup.string().required(t('Please enter organization name')),
            fullname: yup.string().required(t('Please enter name')),
            email: yup.string().required(t('Please enter email address')),
            password: yup.string().required(t('Please enter password')),
            confirmpassword: yup.string().required(t('Please enter confirm password')),
        })
    );

    /*
     * handle form submission
     */
    const onFormSubmit = (formData) => {
        navigate("/account/register-success")
    };



    return (
        <>
            {/* {userSignUp ? <Navigate to={'/account/confirm2'} /> : null} */}

            <AccountLayout bottomLinks={""}>
                <h4 className="mb-3">{t('Sign Up')}</h4>
                <form onSubmit={onFormSubmit}>
                    <Form.Label>Modules *</Form.Label>

                    <Row>
                        <div key={`default-checkbox`} className="mb-2 d-flex">
                            <Form.Check
                                type="checkbox"
                                id={16}
                                value={16}
                                label={'Buyer'}
                                className="m-2"
                            />
                            <Form.Check
                                type="checkbox"
                                id={17}
                                value={17}
                                label={'Supplier'}
                                className="m-2"
                            />
                            <Form.Check
                                type="checkbox"
                                id={18}
                                value={18}
                                label={'Transport'}
                                className="m-2"
                            />
                        </div>
                    </Row>


                    <Row>
                        <FormInput
                            label={t('Pan Card Number *')}
                            type="text"
                            name="pancardno"
                            containerClass={'mb-3 col'}
                        />
                        <FormInput
                            label={t('Pan Card *')}
                            type="file"
                            name="filepancard"
                            containerClass={'mb-3 col'}
                        />
                    </Row>
                    <Row>
                        <FormInput
                            label={t('GSTIN Number *')}
                            type="text"
                            name="gstinno"
                            containerClass={'mb-3 col'}
                        />
                        <FormInput
                            label={t('GSTIN File *')}
                            type="file"
                            name="filegstincard"
                            containerClass={'mb-3 col'}
                        />
                    </Row>

                    <FormInput
                        label={t('I accept Terms and Conditions')}
                        type="checkbox"
                        name="checkboxsignup"
                        containerClass={'mb-3 text-muted'}
                    />

                    <div className="mb-0 d-grid text-center">
                        <div className='d-flex' style={{ justifyContent: "space-between" }}>
                            <Link to="/account/register" className='btn btn-primary'>Previous</Link>
                            <Button variant="primary" type="submit" disabled={loading}>
                                {t('Submit')}
                            </Button>
                        </div>
                    </div>

                    {/* social links */}
                    {/* <div className="text-center mt-4">
                        <p className="text-muted font-16">{t('Sign up using')}</p>
                        <ul className="social-list list-inline mt-3">
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-primary text-primary">
                                    <i className="mdi mdi-facebook"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-danger text-danger">
                                    <i className="mdi mdi-google"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-info text-info">
                                    <i className="mdi mdi-twitter"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-secondary text-secondary">
                                    <i className="mdi mdi-github"></i>
                                </Link>
                            </li>
                        </ul>
                    </div> */}
                </form>
            </AccountLayout>
        </>
    );
};

export default RegisterStep2;
