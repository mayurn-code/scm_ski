import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { master_list } from '../helpers';



const loadMasterList = (propType) => {
    const response = master_list();
    response.then(result => {
        const resultObj = result.data.data
        if (propType === "countries")
            return resultObj.countries;
        if (propType === "document_types")
            return resultObj.document_types;
        if (propType === "material_categories")
            return resultObj.material_categories
        if (propType === "materials")
            return resultObj.materials
        if (propType === "time_zones")
            return resultObj.time_zones
        if (propType === "truck_types")
            return resultObj.truck_types
        if (propType === "unit_of_measurements")
            return resultObj.unit_of_measurements
    }).catch(error => {
        return toast.error(error)
    })
}


const CountriesListComponent = () => {
    const [list, setList] = useState([])
    useEffect(() => {
        const data = loadMasterList("countries");
        setList(data);
    }, [])
    return (
        <>
            {list && list.length !== 0 && list.map((item, index) => {
                <option value={item.id}>{item.country_name}</option>
            })}
        </>
    )
}

// const StateListComponent = () => {
//     useEffect(() => {
//         loadMasterList("countries");
//     }, [])
//     return (
//         <></>
//     )
// }
// const CityListComponent = () => {
//     return (
//         <>
//         </>
//     )
// }

export default CountriesListComponent;


