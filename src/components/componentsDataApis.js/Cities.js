import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { load_city_list } from '../../helpers'
import { master_list } from '../../helpers/api/masterList'

const SelectCitiesOptions = ({ id }) => {
    console.log(id)
    const [list, setList] = useState([])
    useEffect(() => {
        load_city_list(id).then(res => {
            if (res !== undefined) {
                if (res.data && res.data.success === true) {
                    const cities = res.data.data
                    const aa = cities.length !== 0 ? cities : []
                    setList(aa)
                }
            }
        })

    }, [])

    return (
        <>
            <option value="0">{`${list && list.length === 0 ? "No records found" : "Select"}`}</option>
            {list.map(item => (
                <option value={item.id}>{item.city_name}</option>
            ))}
        </>

    )
}

export default SelectCitiesOptions; 