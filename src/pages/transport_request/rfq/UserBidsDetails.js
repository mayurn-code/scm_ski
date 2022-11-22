// @flow
import React, { useState } from 'react';
import { Row, Col, Card, ListGroup, Badge, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PageTitle from '../../../components/PageTitle';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { changePo_Status, GetRfqDetails, PoSubmit, TransporterDetails, upload_file } from '../../../helpers/api';
import moment from 'moment-timezone';
import TranspReqFleetsProfile from '../fleets/FleetsProfile';
import TransporterModalPopup from '../fleets/TransporterModalPopup';
import { toast } from 'react-toastify';
import classNames from 'classnames';


const TranspReqUserBidsDetails = () => {
  const { rfqId } = useParams()
  const navigate = useNavigate()
  const [transporterId, setTransporterId] = useState(0)

  /*---------Show/hide the modal-------------*/
  const [modal, setModal] = useState(false);
  const [modalReject, setModalReject] = useState(false);
  const [size, setSize] = useState(null);
  const [className, setClassName] = useState(null);
  const [scroll, setScroll] = useState(null);
  const [selectedVendorIdArr, setSelectedVendorIdArr] = useState([])
  const [selectedVendorIdNum, setSelectedVendorIdNum] = useState(0)
  const [poId, setPoId] = useState(0)

  const [tempPoFile, setTempPoFile] = useState("")
  const [userName, setUserName] = useState("");

  const toggle = () => {
    setModal(!modal);
  };
  const toggleRejectPo = () => {
    setModalReject(!modalReject);
  };

  /**
   * Opens large modal
   */
  const openModalWithSize = (size) => {
    setSize(size);
    setClassName(null);
    setScroll(null);
    toggle();
  };

  /**
   * Opens modal with custom class
   */
  const openModalPopup = (id) => {
    setClassName("modal-70em-width");
    toggle();
    setTransporterId(id);
  };

  /*
  Modal Popup Details End
  */
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
    po_list: []
  })

  const { quote_id, quote_value_id, published_date, drop_address, pickup_address,
    drop_city, drop_city_id, drop_state_id, pickup_city,
    pickup_city_id, pickup_state_id,
    material_name, quantity, UOM, validity_date, description,
    list_of_supplier_bid_not_selected, material_id, po_list } = rfqDetails;

  const loadRfqData = (rfqId) => {
    GetRfqDetails(rfqId).then(res => {
      if (res !== undefined) {
        if (res.data.success) {
          setRfqDetails(res.data.data);
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
    quantity: quantity,
    bid_rate: 0,
    site_id: null,
    material_id: material_id,
    uom: "",
    po_status: "Pending",
    order_status: "Pending",
    po_accepted_date: null,
    pickup_address: pickup_address,
    pickup_city_id: pickup_city_id,
    drop_address: drop_address,
    drop_city_id: drop_city_id,
    pickup_state_id: pickup_state_id,
    drop_state_id: drop_state_id
  })
  useEffect(() => {
    const numberId = Number(selectedVendorIdArr[0]) || 0
    setSelectedVendorIdNum(numberId)
    setPoForm({
      ...poForm,
      selected_vendor_id: numberId,
      pickup_address: pickup_address,
      pickup_city_id: pickup_city_id,
      drop_address: drop_address,
      drop_city_id: drop_city_id,
      pickup_state_id: pickup_state_id,
      drop_state_id: drop_state_id,
      material_id: material_id,
      uom: UOM,
      quantity: quantity,
      rfq_id: rfqId
    })
  }, [selectedVendorIdArr])

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

  const handelCheckBoxes = (e) => {
    if (e.target.checked) {
      setSelectedVendorIdArr(oldArray => [...oldArray, e.target.value]);
    } else {
      const filteredItems = selectedVendorIdArr.filter(item => item !== e.target.value)
      setSelectedVendorIdArr(filteredItems)
    }
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
    else if (selectedVendorIdArr.length === 0) {
      toast.error("Please select supplier")
    }
    else if (selectedVendorIdArr.length >= 2) {
      toast.error("Please select only one supplier")
    }
    else {
      PoSubmit(poForm).then(result => {
        if (result !== undefined) {
          if (result.data.success) {
            toast.success("Po generated")
            return navigate("/transport-request/rfq");
          }
        }
      })
        .catch((e) => {
          return toast.error(e)
        })
    }
  }

  const openModalRejectPo = (id) => {
    setPoId(id);
    toggleRejectPo();
  };


  const updateStatusPoDetails = (po_status) => {
    const data = {
      status: po_status,
      id: poId
    }
    if (poId !== 0) {
      changePo_Status(data).then(result => {
        if (result !== undefined) {
          toast.success("Po successfully " + po_status)
          loadRfqData(rfqId);
        }
      })
    }
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'RFQ List', path: '/transport-request/rfq' },
          { label: 'Bids Details', path: '', active: true },
        ]}
        title={'Bids Details'}
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
                <p>{pickup_city && pickup_city}{pickup_address && pickup_address}</p>
              </Col>
              <Col lg={2} >
                <h4>Drop Address</h4>
                <p>{drop_city && drop_city}{drop_address && drop_address}</p>
              </Col>
              <Col lg={4} >
                <h4>Material</h4>
                <p>{material_name && material_name}</p>
              </Col>
              <Col lg={4} >
                <h4>Quantity</h4>
                <p>{quantity && quantity} {' '} {UOM && UOM}</p>
              </Col>
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

      <Row>
        {po_list && po_list.length !== 0 &&
          <Col xs={12}>
            <Card style={{ minHeight: "450px" }}>
              <Card.Body>
                <h4>Selected Bids</h4>
                <Table>
                  <thead>
                    <tr>
                      <th>Supplier</th>
                      <th>Bid plan</th>
                      <th>PO Date</th>
                      <th>PO Number</th>
                      <th>GST %</th>
                      <th>PO</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {po_list.length !== 0 ? po_list.map((item, index) => (
                      <tr>
                        <td>{item.supplier_Name && item.supplier_Name}</td>
                        <td>{item.bid_rate && item.bid_rate}</td>
                        <td>{item.po_date && moment(new Date(item.po_date)).format("D MMM YYYY")}</td>
                        <td>{item.po_number && item.po_number}</td>
                        <td>{item.gst_rate && item.gst_rate + "%"}</td>
                        <td>
                          {item.attachment ?
                            <Link to={item.attachment ? item.attachment : ""} target="_blank" download>
                              <i className="uil uil-arrow-to-bottom"></i>
                            </Link>
                            :
                            ""}
                        </td>
                        <td>{item.po_status && item.po_status}</td>
                        <td>
                          {item.po_status === "Pending" &&
                            <Button variant="danger" onClick={() => openModalRejectPo(item.po_id)} >
                              Reject
                            </Button>
                          }

                        </td>
                      </tr>
                    ))
                      :
                      <>
                        No records found.
                      </>
                    }

                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        }

        <Col xs={8}>
          <Card style={{ minHeight: "450px" }}>
            <Card.Body>
              <h4>Bids</h4>
              <Table>
                <thead>
                  <tr>
                    <th>Transporter</th>
                    <th>Bid per MT</th>
                    <th>Remark</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {list_of_supplier_bid_not_selected.length !== 0 ? list_of_supplier_bid_not_selected.map((item, index) => (
                    <tr>
                      <td>{item.supplier_name && item.supplier_name}</td>
                      <td>{item.bid_amount && item.bid_amount}</td>
                      <td>{item.remark && item.remark}</td>
                      <td>
                        <input name="transporterProfilePo"
                          onChange={handelCheckBoxes}
                          value={item.supplier_id}
                          type="checkbox" className="form-check-input" />

                      </td>
                      <td>
                        <Button variant="default" onClick={() => openModalPopup(item.supplier_id)} >
                          <i className="mdi mdi-eye mdi-18px"></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                    :
                    <>
                      No records found.
                    </>
                  }

                </tbody>
              </Table>
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

      <Modal show={modal} onHide={toggle} dialogClassName={className} size={size} scrollable={scroll}>
        <Modal.Header onHide={toggle} closeButton>
          <h4 className="modal-title">Transporter</h4>
        </Modal.Header>
        <Modal.Body>
          <TransporterModalPopup transporterId={transporterId} />
        </Modal.Body>
      </Modal>

      <Modal show={modalReject} onHide={toggleRejectPo}>
        <Modal.Header
          onHide={toggleRejectPo}
          closeButton
          className={classNames('modal-colored-header', 'bg-danger')}>
          <h4 className="modal-title text-light">Reject Po</h4>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mt-0">Are you sure want to reject</h5>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={toggleRejectPo}>
            Cancel
          </Button>{' '}
          <Button variant="danger" onClick={() => updateStatusPoDetails("Rejected")}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};



export default TranspReqUserBidsDetails;
