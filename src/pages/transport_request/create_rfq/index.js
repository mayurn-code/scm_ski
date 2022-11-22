import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle'
import TransporterListComp from '../fleets/TransporterList';


const TranspReqFleets = () => {
    const location = useLocation();
    const supplierDataArr = location.state && location.state.selectedSupplierData ? location.state.selectedSupplierData : []
    const materialid = location.state && location.state.materialid ? location.state.materialid : 0
    const materialName = location.state && location.state.materialName ? location.state.materialName :""
    const pickupcityid = location.state && location.state.pickupcityid ? location.state.pickupcityid : 0
    const pickupcityName = location.state && location.state.pickupcityName ? location.state.pickupcityName : ""
    const dropcityid = location.state && location.state.dropcityid ? location.state.dropcityid : 0
    const dropcityName = location.state && location.state.dropcityName ? location.state.dropcityName : ""
    const pickupStateid = location.state && location.state.pickupStateid ? location.state.pickupStateid : 0
    const dropStateid = location.state && location.state.dropStateid ? location.state.dropStateid : 0

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Create RFQ'}
            />
            <TransporterListComp
                selectedSupplierArr={supplierDataArr}
                materialid={materialid}
                materialName={materialName}
                pickupcityid={pickupcityid}
                pickupcityName={pickupcityName}
                dropcityid={dropcityid}
                dropcityName={dropcityName}
                pickupStateid={pickupStateid}
                dropStateid={dropStateid}
                listtype="createrfq"
            />
        </>
    )
}

export default TranspReqFleets