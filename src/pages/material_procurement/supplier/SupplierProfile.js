import React, { useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import SupplierModalPopup from './SupplierModalPopup';

const MaterialProcuSupplierProfile = () => {
    const { supplierId } = useParams();
    return (
        <>

            <PageTitle
                breadCrumbItems={[
                    { label: 'Supplier', path: '/material-procurement/supplier', goBack: true },
                    { label: 'Profile', path: '', active: true },

                ]}
                title={'Supplier Profile'}
            />
            <SupplierModalPopup supplierId={supplierId} />
        </>
    )
}

export default MaterialProcuSupplierProfile;