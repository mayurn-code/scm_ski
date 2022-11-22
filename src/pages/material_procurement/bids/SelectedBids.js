// @flow
import React from 'react';
import { Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';


const MaterialProcuSelectedBids = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Bids', path: '' },
          { label: 'quote-details', path: '', active: true },
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
                <p>ATSPL-BPL-123</p>
              </Col>
              <Col lg={4} >
                <h4>Published On</h4>
                <p>12 Aug 2022</p>
              </Col>
              <Col lg={4} >
                <h4>Site Location</h4>
                <p>Delhi</p>
              </Col>
              <Col lg={4} >
                <h4>Material</h4>
                <p>Ultrafine Flyash</p>
              </Col>
              <Col lg={4} >
                <h4>Quantity</h4>
                <p>200 MT</p>
              </Col>
              {/* <Col lg={3} >
                            <h4>Organization/Requested By</h4>
                            <p>Delhi</p>
                        </Col> */}
              <Col lg={4} >
                <h4>PO Validity Date</h4>
                <p>15 Aug 2022</p>
              </Col>
              {/* <Col lg={3} >
                            <h4>Contact Person Name</h4>
                            <p>KK Soni</p>
                        </Col>
                        <Col lg={3} >
                            <h4>Mobile</h4>
                            <p>7566550986</p>
                        </Col>
                        <Col lg={3} >
                            <h4>Email</h4>
                            <p>kksoni@acompworld.com</p>
                        </Col> */}
              <Col lg={12} >
                <h4>Description</h4>
                <p>With supporting text below as a natural lead-in to additional contenposuere erat a ante.
                  Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni similique?
                  Tempore, quos delectus asperiores libero voluptas quod perferendis! Voluptate, quod illo
                  rerum? Lorem ipsum dolor sit amet.</p>
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
                  <tr>

                    <td>XOZ supplier</td>
                    <td>4500</td>
                    <td>10 /03 /2022</td>
                    <td>A75 1001 243</td>
                    <td>8%</td>
                    <td></td>
                    <td>issued</td>
                    <td></td>

                  </tr>

                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </Col>


      <Row>
        <Col xs={8}>
          <Card>
            <Card.Body>
              <h4>Other Bids</h4>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Supplier</th>
                      <th>Bid plan</th>
                      <th>Remark</th>
                      <th>Action</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>XOZ supplier</td>
                      <td>4500</td>
                      <td>---</td>
                      <td><Button variant="outline-primary">Select</Button> </td>
                      <td><Link to="/material-procurement/supplier-profile" className="btn btn-default"><i className="mdi mdi-eye"></i></Link></td>
                    </tr>
                    <tr>
                      <td>XOZ supplier</td>
                      <td>4500</td>
                      <td>---</td>
                      <td><Button variant="outline-primary">Select</Button></td>
                      <td><Link to="/material-procurement/supplier-profile" className="btn btn-default"><i className="mdi mdi-eye"></i></Link></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>



        <Col xs={4}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>PO Date</Form.Label>
                  <Form.Control type="date" />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>PO Number</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>GST in %</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Upload PO</Form.Label>
                  <Form.Control type="file" Placeholders="Browse" />
                </Form.Group>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className='mb-4'>
        <Button variant="primary" type="submit" >
          Accept & Update
        </Button>
      </div>
    </>
  );
};

export default MaterialProcuSelectedBids;
