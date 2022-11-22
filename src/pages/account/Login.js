// @flow
import React, { useEffect,useState } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, Navigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
//Css
import "../../assets/css/login.css"

//actions
import { resetAuth, loginUser } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/';
import Spinner from '../../components/Spinner';

import AccountLayout from './AccountLayout';

// Images
import GroupImg from "../../assets/images/login/Group.png"
import Group1Img from "../../assets/images/login/Group1.png"
import logoImg from "../../assets/images/login/logo.png"
import PolygonImg from "../../assets/images/login/Polygon.png"
import sdfASdImg from "../../assets/images/login/sdfASd.png"
import supportImg from "../../assets/images/login/support.png"
import { useForm } from 'react-hook-form';
import { ValidateEmail } from '../../helpers/validation';



/* bottom link of account pages */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t("Don't have an account?")}{' '}
                    <Link to={'/account/register'} className="text-muted ms-1">
                        <b>{t('Sign Up')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Login = (): React$Element<any> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const redirectUrl = location.state && location.state.from ? location.state.from.pathname : '/';
    const [userDetails, setUserDetails] = useState(
        {
            user_email: "",
            user_password: ""
        }
    )

    const { user_email, user_password } = userDetails;

    const onInputChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const { loading, userLoggedIn, user, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    useEffect(() => {
        return toast.error(error);
    }, [error, user, loading, userLoggedIn])

    /*
    handle form submission
    */
    const submitForm = (e) => {
        e.preventDefault();
        if (!user_email.trim()) {
            return toast.error("Please enter email");
        }
        else if (!ValidateEmail(user_email.trim())) {
            return toast.error("Please enter valid email");
        } else if (!user_password.trim()) {
            return toast.error("Please enter password");
        } else {
            dispatch(loginUser(user_email.trim(), user_password.trim()));
        }
    };

    return (
        <>
            {/* {error && toast.error(error)} */}
            {(userLoggedIn || user) && <Navigate to={redirectUrl} replace />}
            <>
                <div className="maincontainer">
                    <div className="leftside Polygon">
                        <a href="#"><img src={logoImg} className="logo" style={{ position: "absolute" }} /></a>
                        <div className="ls_content">
                            <h2>Supply Chain Management System</h2>
                            <p>Unique and powerful suite of software to run your entire business, brought to you by a company with the long term vision to transform the way you work.</p>
                        </div>
                        <img src={GroupImg} className="imgbottom" />
                    </div>
                    <div className="rightside">
                        <form
                            className="form_card"
                            onSubmit={submitForm}>
                            <h3 className="login_title">Login to your account</h3>
                            <div className="logininput ">
                                <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Email</h6>
                                </label>
                                <input className="mb-4" type="text" value={user_email} name="user_email" placeholder="Enter user name" onChange={(e) => onInputChange(e)} />
                            </div>

                            <div className="logininput">
                                <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Password</h6>
                                </label>
                                <input className="mb-4" type="password" value={user_password} name="user_password" placeholder="Password" onChange={(e) => onInputChange(e)} />
                            </div>

                            <div className="mb-3 mb-0 text-center">
                                {loading ? <Button className='btn btn-redtheme text-center' disabled>
                                    <Spinner className="spinner-border-sm me-1" tag="span" color="white" />
                                    Loading...
                                </Button>
                                    :
                                    <button type="submit" className="btn btn-redtheme text-center">Login</button>
                                }
                                <div className="forgot"><a href="#">Forgot Password?</a></div>
                                <div style={{ color: "#fff" }} className="forgot">Not Register ?<Link to="/account/register"> Create an Account</Link></div>
                            </div>
                        </form>

                        <img src={supportImg} className="support" />
                    </div>
                </div>
            </>
        </>
    );
};

export default Login;
