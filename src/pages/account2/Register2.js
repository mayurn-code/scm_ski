// @flow
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Alert, Row, Form, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


// actions
import { resetAuth, signupUserStepOne } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from './AccountLayout';
import { load_city_list, load_state_list, master_list } from '../../helpers';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ValidateEmail } from '../../helpers/validation';
import Spinner from '../../components/Spinner';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t('Already have account?')}{' '}
                <Link to={'/account/login'} className="text-muted ms-1">
                    <b>{t('Log In')}</b>
                </Link>
            </p>
        </footer>
    );
};

const Register2 = (): React$Element<React$FragmentType> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [country, setCountry] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const { loading, userSignUp, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp
    }));

    useEffect(() => {
        console.log(loading, userSignUp, error)
        // return toast.error(error)
    }, [loading, userSignUp, error])

    const [registerStepOneForm, setRegisterStepOneForm] = useState({
        first_name: "",
        organization_name: "",
        email: "",
        mobile: "",
        country_id: 0,
        state_id: 0,
        city_id: 0
    })
    const { first_name, organization_name, email, mobile, country_id, state_id, city_id } = registerStepOneForm;

    const onInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setRegisterStepOneForm({
            ...registerStepOneForm,
            [name]: value
        })
    }

    const loadCountries = () => {
        master_list().then(res => {
            if (res !== undefined) {
                if (res.data && res.data.success === true) {
                    const countries = res.data.data
                    setCountry(countries.countries.length !== 0 ? countries.countries : null)
                }
            }
        })
    }

    const handelLoadState = (e) => {
        setRegisterStepOneForm({
            ...registerStepOneForm,
            country_id: e.target.value || null
        })
        load_state_list(e.target.value).then(res => {
            if (res !== undefined) {
                if (res.data && res.data.success === true) {
                    const states = res.data.data
                    setStates(states.length !== 0 ? states : [])
                }
            }
        })
    }

    const handelLoadCities = (e) => {
        setRegisterStepOneForm({
            ...registerStepOneForm,
            state_id: e.target.value || null
        })
        load_city_list(e.target.value).then(res => {
            if (res !== undefined) {
                if (res.data && res.data.success === true) {
                    const cities = res.data.data
                    setCities(cities.length !== 0 ? cities : [])
                }
            }
        })
    }

    useEffect(() => {
        loadCountries();
        dispatch(resetAuth());
    }, [dispatch]);



    /*
     * handle form submission
     */
    const onFormSubmit = (e) => {
        e.preventDefault();
        if (!organization_name.trim()) {
            return toast.error("Please enter organization name")
        }
        else if (!first_name.trim()) {
            return toast.error("Please enter first name")
        }
        else if (!email.trim()) {
            return toast.error("Please enter email")
        }
        else if (!ValidateEmail(email.trim())) {
            return toast.error("Please enter valid email");
        }
        else if (!mobile.trim()) {
            return toast.error("Please enter mobile")
        }
        else if (mobile.length !== 10) {
            return toast.error("Please enter 10 digit mobile numner")
        }
        else if (!country_id) {
            return toast.error("Please select country")

        }
        else if (!state_id) {
            return toast.error("Please select state")
        }
        else if (!city_id) {
            return toast.error("Please select city")

        }
        dispatch(signupUserStepOne(organization_name.trim(), first_name.trim(), email.trim(), mobile.trim(), country_id, state_id, city_id));
        // navigate("/account/register-step-two")
    };

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
                <h4 className="mb-3">{t('Sign Up')}</h4>
                <form onSubmit={onFormSubmit}>
                    <FormInput
                        onChange={onInputChange}
                        label={t('Organization Name *')}
                        type="text"
                        maxLength="200"
                        name="organization_name"
                        value={organization_name}
                        placeholder={t('Enter your organization name')}
                        containerClass={'mb-3'}
                    />
                    <Row>
                        <FormInput
                            onChange={onInputChange}
                            label={t('Contact Person Name *')}
                            type="text"
                            name="first_name"
                            value={first_name}
                            maxLength="100"
                            placeholder={t('Enter contact person name')}
                            containerClass={'mb-3 col'}
                        />
                        <FormInput
                            onChange={onInputChange}
                            label={t('Email *')}
                            type="email"
                            name="email"
                            value={email}
                            placeholder={t('Enter your email')}
                            containerClass={'mb-3 col'}
                        />
                    </Row>

                    <Row>

                        <FormInput
                            onChange={onInputChange}
                            label={t('Mobile Number *')}
                            type="text"
                            name="mobile"
                            value={mobile}
                            maxLength="10"
                            placeholder={t('Enter your mobile number')}
                            containerClass={'mb-3 col'}
                        />
                        {/* country */}
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Country *</Form.Label>
                            <Form.Select onChange={handelLoadState} name="country_id" value={country_id}>
                                <option value="">Select</option>
                                {country.map(item => (
                                    <option value={item.id}>{item.country_name + "  (" + item.country_code + ")"}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridState" className='mb-3'>
                            <Form.Label>State *</Form.Label>
                            <Form.Select onChange={handelLoadCities} name="state_id" value={state_id}>
                                <option value="">Select</option>
                                {states.map(item => (
                                    <option value={item.id}>{item.state_name + "  (" + item.state_code + ")"}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState" className='mb-3'>
                            <Form.Label>City *</Form.Label>
                            <Form.Select onChange={onInputChange} name="city_id" value={city_id}>
                                <option value="">Select</option>
                                {cities.map(item => (
                                    <option value={item.id}>{item.city_name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                    </Row>


                    <div className="mb-0 d-grid text-center">
                        <div className='d-flex' style={{ justifyContent: "space-between" }}>
                            <div className='col'></div>
                            {loading ? <Button className='btn btn-redtheme text-center' disabled>
                                <Spinner className="spinner-border-sm me-1" tag="span" color="white" />
                                Loading...
                            </Button>
                                :
                                <Button variant="primary" type="submit">
                                    {t('Continue')}
                                </Button>
                            }

                        </div>
                    </div>

                 
                </form>
            </AccountLayout>
        </>
    );
};

export default Register2;
