// @flow
import React from 'react';
import PageTitle from '../../../components/PageTitle';
import TransporterListComp from '../fleets/TransporterList';

// main component
const TranspReqDirectOrder = (): React$Element<React$FragmentType> => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Direct Order'}
            />
            <TransporterListComp listtype="directorder" />
        </>
    );
};

export default TranspReqDirectOrder;