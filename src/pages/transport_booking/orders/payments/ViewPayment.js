import React from 'react'
import { useParams } from 'react-router-dom'
import TransportBookingOrderAddPayment from './AddPayment'

const TransportBookingOrderViewPayment = () => {
    const { paymentid } = useParams()
    return (
        <TransportBookingOrderAddPayment paymentid={paymentid} type="view" />
    )
}

export default TransportBookingOrderViewPayment