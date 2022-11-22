// @flow
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// images
import LogoLight from '../../assets/images/logo.png';
import LogoDark from '../../assets/images/logo-dark.png';
import LogoScmDark from '../../assets/images/login/logo.png';


type AccountLayoutProps = {
    bottomLinks?: React$Element<any>,
    children?: any,
};

const AccountLayout = ({ bottomLinks, children }: AccountLayoutProps): React$Element<React$FragmentType> => {
    useEffect(() => {
        if (document.body) document.body.classList.add('authentication-bg');

        return () => {
            if (document.body) document.body.classList.remove('authentication-bg');
        };
    }, []);

    const { t } = useTranslation();

    return (
        <>
            <div className="auth-fluid">

                {/* Auth fluid right content */}
                <div className="auth-fluid-right text-center">
                    <div className="auth-brand text-center text-lg-start">
                        <Link to="/" className="logo-dark">
                            <span>
                                <img src={LogoScmDark} alt="" height="40" />
                            </span>
                        </Link>
                        <Link to="/" className="logo-light">
                            <span>
                                <img src={LogoScmDark} alt="" height="40" />
                            </span>
                        </Link>
                    </div>
                </div>
                {/* Auth fluid left content */}
                <div className="auth-fluid-form-box" style={{padding:"1rem 2rem"}} >
                    <div className="align-items-center d-flex">
                        <Card.Body style={{padding:"0"}}>
                            {children}
                            {/* footer   links */}
                            {bottomLinks}
                        </Card.Body>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountLayout;
