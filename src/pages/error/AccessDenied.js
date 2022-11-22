// @flow
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

// images
import Logo from '../../assets/images/logo.png';
import AccountLayout from '../account/AccountLayout';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions';
import logoutIcon from '../../assets/images/logout-icon.svg';

    /* bottom link */
    const BottomLink = () => {
        const { t } = useTranslation();
    
        return (
            <Row className="mt-3">
                <Col className="text-center">
                    <p className="text-muted">
                        {t('Back to ')}{' '}
                        <Link to={'/account/login'} className="text-muted ms-1">
                            <b>{t('Log In')}</b>
                        </Link>
                    </p>
                </Col>
            </Row>
        );
    };

const AccessDenied = (): React$Element<React$FragmentType> => {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
            <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('You are not authorized !')}</h4>
                    <p className="text-muted mb-4">{t('You are now successfully sign out.')}</p>
                    <div className="logout-icon m-auto">
                        <img src={logoutIcon} alt="" />
                    </div>
                </div>

            </AccountLayout>
        </>
    );
};

export default AccessDenied;
