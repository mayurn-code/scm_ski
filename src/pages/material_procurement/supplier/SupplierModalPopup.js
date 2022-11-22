import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { SupplierDetails, TransporterDetails } from '../../../helpers';


const SupplierModalPopup = ({ supplierId }) => {

  const [supplierDetails, setSupplierDetails] = useState({
    contact_person: "",
    email: "",
    mobile: "",
    supplier: "",
    supplier_location: "",
    material_list: [],
    client_site_list: [],
    gst_in_no: null,
    site_location: null
  })
  const { contact_person, email, mobile, supplier, site_location, material_list, client_site_list, gst_in_no } = supplierDetails;
  useEffect(() => {
    const data = {
      supplierid: supplierId,
      module: "Supplier"
    }
    SupplierDetails(data).then(res => {
      if (res !== undefined) {
        const result = res.data
        if (result.success) {
          console.log(result.data, '---result.data')
          setSupplierDetails(result.data)
        }
      }
    })
  }, [supplierId])

  return (
    <Row>
      <Col md={4}>
        {/* User's seller information */}
        <Card>
          <Card.Body>
            <h4 className="header-title mt-0 mb-3">Supplier Details :</h4>

            <hr />

            <div className="text-start">
              <p className="text-muted">
                <strong> Name :</strong> <span className="ms-2">{supplier && supplier}</span>
              </p>
              <p className="text-muted">
                <strong>Contact Name :</strong> <span className="ms-2">{contact_person && contact_person}</span>
              </p>

              <p className="text-muted">
                <strong>Mobile :</strong>
                <span className="ms-2">{mobile && mobile}</span>
              </p>

              <p className="text-muted">
                <strong>Email :</strong> <span className="ms-2">{email && email}</span>
              </p>

              <p className="text-muted">
                <strong>Address :</strong> <span className="ms-2">{site_location && site_location}</span>
              </p>

              <p className="text-muted">
                <strong>GSTIN No. :</strong>
                <span className="ms-2"> {gst_in_no ? gst_in_no : ""} </span>
              </p>
            </div>
          </Card.Body>
        </Card>

      </Col>
      <Col md={4}>
        {/* User's seller information */}
        <Card style={{ minHeight: "295px" }}>
          <Card.Body>
            <Row>
              <Col>
                <h4 className="header-title mt-0 mb-3">Material List</h4>
                <hr />
                {material_list.length === 0 ? <>No records found.</> :

                  material_list.map((item, index) => (
                    <div key={index + "material"} className="d-flex">
                      <i className="uil uil-arrow-growth me-2 font-18 text-primary"></i>
                      <div>
                        <p>{item.material_name_list}</p>
                      </div>
                    </div>
                  ))
                }

              </Col>
            </Row>
          </Card.Body>
        </Card>

      </Col>
      <Col md={4}>
        <Card style={{ minHeight: "295px" }}>
          <Card.Body>
            <Row>
              <Col>
                <h4 className="header-title mt-0 mb-3">Service Locations</h4>
                <hr />
                {client_site_list.length === 0 ?
                  <>
                    No records found.
                  </> :
                  client_site_list.map((item, index) => (
                    <div key={index} className="d-flex">
                      <i className="mdi mdi-map-marker-radius mdi-18px text-primary"></i>
                      <div>
                        <p>  {item.client_site_city && item.client_site_city}</p>
                      </div>
                    </div>
                  ))
                }
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>

    </Row>
  )
}

export default SupplierModalPopup;