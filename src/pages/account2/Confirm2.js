// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// components
import AccountLayout from './AccountLayout';

// images
import mailSent from '../../assets/images/mail_sent.svg';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">{t('© 2022 Global Group')}</p>
        </footer>
    );
};

const Confirm2 = (): React$Element<React$FragmentType> => {
    const { t } = useTranslation();

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center" style={{marginTop:"8rem"}}>
                    <img src={mailSent} alt="mail sent" height="64" />
                    <h4 className="text-dark-50 text-center mt-4 fw-bold">{t('Please check your email')}</h4>
                    <p className="text-muted mb-4">
                        {t(
                            'A email has been send to '
                        )}
                        <b>youremail@domain.com</b>
                        {t(
                            ' Please check for an email from company and click on the included link to set your password.'
                        )}
                    </p>
                    <form>
                        <div className="mb-0 d-grid text-center">
                            <Link to="/account/login" className="btn btn-primary">
                                <i className="mdi mdi-home me-1"></i> {t('Go to Login')}{' '}
                            </Link>
                        </div>
                    </form>
                </div>
            </AccountLayout>
        </>
    );
};

export default Confirm2;
