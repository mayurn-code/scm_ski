// @flow
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageTitle from '../../../components/PageTitle';
import { GetRfqDetails, PoSubmit, upload_file } from '../../../helpers/api';


const TranspReqSelectedBids = () => {
  const { rfqId } = useParams()
  const [rfqDetails, setRfqDetails] = useState({
    quote_id: "",
    quote_value_id: "",
    published_date: "",
    drop_address: null,
    drop_city: null,
    drop_city_id: null,
    drop_state_id: null,
    pickup_address: "",
    pickup_city: null,
    pickup_city_id: null,
    pickup_state_id: null,
    material_name: "",
    material_id: 0,
    quantity: "",
    UOM: '',
    validity_date: "",
    description: "",
    list_of_supplier_bid_not_selected: [],
    list_of_supplier_bid_selected: []
  })
  const { quote_id,quote_value_id, published_date, drop_address, pickup_address,
    material_name, quantity, UOM, validity_date, description,pickup_city,drop_city,
    list_of_supplier_bid_not_selected, list_of_supplier_bid_selected } = rfqDetails;


  const loadRfqData = (rfqId) => {
    GetRfqDetails(rfqId).then(res => {
      if (res !== undefined) {
        if (res.data.success) {
          console.log(res.data.data, 'rfq details')
          setRfqDetails(res.data.data)

        }
      }
    })
  }

  useEffect(() => {
    loadRfqData(rfqId);
  }, [])

  const [poForm, setPoForm] = useState({
    po_for: "Transport",
    po_type: "RFQ",
    rfq_id: rfqId || 0,
    po_date: "",
    po_number: "",
    attachment: "",
    gst_rate: 0,
    po_amount: 0,
    selected_vendor_id: 0,
    quantity: "",
    bid_rate: 0,
    site_id: null,
    material_id: "",
    uom: "",
    po_status: "Pending",
    order_status: "Pending",
    po_accepted_date: null,
    pickup_address: "",
    pickup_city_id: "",
    drop_address: "",
    drop_city_id: "",
    pickup_state_id: "",
    drop_state_id: ""
  })

  const {
    po_date, po_number, gst_rate, attachment, selected_vendor_id
  } = poForm;

  const onInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setPoForm({
      ...poForm,
      [name]: value
    })
  }



  /* handel file change*/
  const handelonFileChange = (e) => {
    const data = {
      UploadFor: "PO",
      file: e.target.files[0]
    }
    const response = upload_file(data);
    response.then(res => {
      if (res.data) {
        const status = res.data.success
        const data = res.data.data
        const message = res.data.message
        if (status === true) {
          const filepath = data.file_path
          if (filepath) {
            setPoForm({
              ...poForm,
              attachment: filepath
            })
          }
        } else if (status == false) {
          return toast.error(message)
        }
      }
    })
  }

  const onPoFormSubmit = (e) => {
    e.preventDefault();
    if (!po_date) {
      toast.error("Please enter po date")
    } else if (!po_number.trim()) {
      toast.error("Please enter po number")
    } else if (!gst_rate || gst_rate === 0) {
      toast.error("Please enter gst rate")
    }
    // else if (selectedVendorIdArr.length === 0) {
    //   toast.error("Please select supplier")
    // }
    // else if (selectedVendorIdArr.length >= 2) {
    //   toast.error("Please select only one supplier")
    // }
    else {
      PoSubmit(poForm).then(result => {
        if (result !== undefined) {
          if (result.data.success) {
            return toast.success("Po generated")
          }
        }
      })
        .catch((e) => {
          return toast.error(e)
        })
    }
  }

  return (
    <>

      <PageTitle
        breadCrumbItems={[
          { label: 'RFQ List', path: '/transport-request/rfq' },
          { label: 'Bids Details', path: '', active: true }
        ]}
        title={'Selected Bids'}
      />

      <Col xs={12}>
        <Card>
          <Card.Body>
            <h4>Request Details</h4>
            <Row>
              <Col lg={4} >
                <h4>Quote Id</h4>
                <p>{quote_value_id && quote_value_id}</p>
              </Col>
              <Col lg={4} >
                <h4>Published On</h4>
                <p>{published_date && moment(new Date(published_date)).format("D MMM YYYY")}</p>
              </Col>

              <Col lg={2} >
                <h4>Pickup Address</h4>
                <p>{pickup_city && pickup_city}</p>
              </Col>
              <Col lg={2} >
                <h4>Drop Address</h4>
                <p>{drop_city && drop_city}</p>
              </Col>
              <Col lg={4} >
                <h4>Material</h4>
                <p>{material_name && material_name}</p>
              </Col>
              <Col lg={4} >
                <h4>Quantity</h4>
                <p>{quantity && quantity} {' '} {UOM && UOM}</p>
              </Col>
              {/* <Col lg={3} >
                            <h4>Organization/Requested By</h4>
                            <p>Delhi</p>
                        </Col> */}
              <Col lg={4} >
                <h4>PO Validity Date</h4>
                <p>{validity_date && moment(new Date(validity_date)).format("D MMM YYYY")}</p>
              </Col>

              <Col lg={12} >
                <h4>Description</h4>
                <p>{description && description}</p>
              </Col>



            </Row>

          </Card.Body>
        </Card>
      </Col>

      <Col xs={12}>
        <Card>
          <Card.Body>
            <h4>PO details</h4>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th>Transporter</th>
                    <th>Bid per MT</th>
                    <th>PO Date</th>
                    <th>PO Number</th>
                    <th>GST %</th>
                    <th>PO</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {list_of_supplier_bid_selected && list_of_supplier_bid_selected.length !== 0 ?
                    list_of_supplier_bid_selected.map(item => (
                      <tr>
                        <td>Shree Uma Industries & Suppliers</td>
                        <td>4500</td>
                        <td>10 /03 /2022</td>
                        <td>A75 1001 243</td>
                        <td>8%</td>
                        <td></td>
                        <td>issued</td>
                        <td></td>
                      </tr>
                    ))

                    :
                    <>
                      No records found.
                    </>
                  }
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Row>
        <Col xs={8}>
          <Card style={{ minHeight: "415px" }}>
            <Card.Body>
              <h4>Bids</h4>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Transporter</th>
                      <th>Bid per MT</th>
                      <th>Remark</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      list_of_supplier_bid_not_selected &&
                        list_of_supplier_bid_not_selected.length !== 0
                        ?
                        list_of_supplier_bid_not_selected.map((item, index) => (
                          <tr>
                            <td>{item.supplier_name && item.supplier_name}</td>
                            <td>{item.bid_amount && item.bid_amount}</td>
                            <td>{item.remark && item.remark}</td>
                            <td>
                              <input type="checkbox" className="form-check-input" />
                            </td>
                            <td>
                              <Link to={"/material-procurement/supplier-profile/" + item.supplier_id} className="btn btn-default"><i className="mdi mdi-eye"></i></Link>
                            </td>
                          </tr>
                        ))

                        :
                        "No records found."
                    }
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>


        <Col xs={4}>
          <Card>
            <Card.Body>
              <Form onSubmit={onPoFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>PO Date</Form.Label>
                  <Form.Control type="date" value={po_date} name="po_date" onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>PO Number</Form.Label>
                  <Form.Control type="text" value={po_number} name="po_number" onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>GST in %</Form.Label>
                  <Form.Control type="number" value={gst_rate} name="gst_rate" onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Upload PO</Form.Label>
                  <Form.Control onChange={handelonFileChange} type="file" Placeholders="Browse" />
                </Form.Group>
                <div style={{ float: "right" }}>
                  <Button variant="primary" type="submit">
                    Accept & Update
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Button variant="primary" type="submit" className='float-right'>
        Accept & Update
      </Button>
    </>
  );
};

export default TranspReqSelectedBids;
