// @flow
import React from 'react';
import PageTitle from '../../../components/PageTitle';
import SupplierListComp from '../supplier/Supplier';

// main component
const MaterialProcurementDirectOrder = (): React$Element<React$FragmentType> => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Direct Order'}
            />
            <SupplierListComp listtype="directorder" />
        </>
    );
};

export default MaterialProcurementDirectOrder;