import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export const supplierData = [
    {
        id: 1,
        supplier_name: 'Mayur Suppliers',
        contact_person: 'mayur',
        phone: "7989787777",
        email: "mayur@gmail.com",
        location: "Surat",
        pono: "ATSPL-NGP-123"
    },
    {
        id: 2,
        supplier_name: 'Vinayak Suppliers',
        contact_person: 'vinayak',
        phone: "7989787777",
        email: "mayur@gmail.com",
        location: "Hyderabad",
        pono: "ATSPL-NGP-222"
    },
    {
        id: 3,
        supplier_name: 'Kunadn Suppliers',
        contact_person: 'kundan',
        phone: "7989787777",
        email: "mayur@gmail.com",
        location: "Gurgaon",
        pono: "ATSPL-NGP-223"
    },
]




export const quoteData = [
    {
        id: 'ATSPL/BPL/1',
        published_on: '01/08/2022',
        material: 'Altra Fire Flyash ',
        quantity: '38 Bags',
        status: true,
        bids: <Link to="/material-procurement/selected-bid" className="btn btn-primary">Bids (92) </Link>,
    },
    {
        id: 'ATSPL/BPL/2',
        published_on: '11/08/2022',
        material: 'Cement',
        quantity: '18 Bags',
        status: true,
        bids: <Link to="/material-procurement/selected-bid" className="btn btn-primary">Bids (32) </Link>,
    },
    {
        id: 'ATSPL/BPL/3',
        published_on: '25/08/2022',
        material: 'Iron',
        quantity: '17 MT',
        status: true,
        bids: <Link to="/material-procurement/selected-bid" className="btn btn-primary">Bids (12) </Link>,
    },

]