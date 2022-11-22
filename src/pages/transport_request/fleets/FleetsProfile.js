import React, { useRef, useEffect, forwardRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import { TransporterDetails } from '../../../helpers/api';
import { useState } from 'react';
import TransporterModalPopup from './TransporterModalPopup';

const TranspReqFleetsProfile = () => {
    const { transporterid } = useParams();



    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Create RFQ', path: '/transport-request/create-rfq' ,goBack: true},
                    { label: 'Profile', path: '', active: true },

                ]}
                title={'Transport Profile'}
            />
            <TransporterModalPopup transporterId={transporterid} />
        </>
    )
}

export default TranspReqFleetsProfile;