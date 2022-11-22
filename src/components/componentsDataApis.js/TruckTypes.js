import React, { useState, useEffect } from 'react'
import { master_list } from '../../helpers'

const TruckTypes = () => {
    const [list, setList] = useState([])
    useEffect(() => {
        master_list().then(res => {
            const response = res.data;
            if (response !== undefined) {
                if (response.success === true) {
                    setList(response.data.truck_types ? response.data.truck_types.length > 0 ? response.data.truck_types : [] : [])
                }
            }
        })

    }, [])
    return (
        <>
            {list.length !== 0 ?
                <>
                    <option value="0">Select</option>
                    {list.map(item => (
                        <option value={item.id}>{item.truck_type}</option>
                    ))}
                </>
                :
                <option value="">No Items</option>
            }
        </>
    )
}

export default TruckTypes