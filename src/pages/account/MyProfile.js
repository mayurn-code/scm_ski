import React from 'react'
import PageTitle from '../../components/PageTitle'
import profileImg from '../../assets/images/users/avatar-2.jpg';
import { Card, Col, Row } from 'react-bootstrap';
import Messages from '../../components/Messages';
import { Link } from 'react-router-dom';

const MyAccount = () => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Pages', path: '/pages/profile' },
                    { label: 'Profile', path: '/pages/profile', active: true },
                ]}
                title={'Profile'}
            />
            <Row>
                <Col sm={12}>
                    {/* User information */}
                    <Card className="bg-primary">
                        <Card.Body className="profile-user-box">
                            <Row>
                                <Col sm={8}>
                                    <Row className="align-items-center">
                                        <Col className="col-auto">
                                            <div className="avatar-lg">
                                                <img
                                                    src={profileImg}
                                                    style={{ height: '100px' }}
                                                    alt=""
                                                    className="rounded-circle img-thumbnail"
                                                />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>
                                                <h4 className="mt-1 mb-1 text-white">Michael Franklin</h4>
                                                <p className="font-13 text-white-50"> Authorised Brand Seller</p>

                                                <ul className="mb-0 list-inline text-light">
                                                    <li className="list-inline-item me-3">
                                                        <h5 className="mb-1 text-white">$ 25,184</h5>
                                                        <p className="mb-0 font-13 text-white-50">Total Revenue</p>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <h5 className="mb-1 text-white">5482</h5>
                                                        <p className="mb-0 font-13 text-white-50">Number of Orders</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col sm={4}>
                                    <div className="text-center mt-sm-0 mt-3 text-sm-end">
                                        <Link to="/account/my-profile/edit" className="btn btn-light">
                                            <i className="mdi mdi-account-edit me-1"></i> Edit Profile
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Col md={12}>
                {/* User's seller information */}
                <Card>
                    <Card.Body>
                        <h4 className="header-title mt-0 mb-3">Seller Information</h4>
                        <p className="text-muted font-13">
                            Hye, I’m Michael Franklin residing in this beautiful world. I create websites and mobile apps with
                            great UX and UI design. I have done work with big companies like Nokia, Google and Yahoo. Meet me or
                            Contact me for any queries. One Extra line for filling space. Fill as many you want.
                        </p>

                        <hr />

                        <div className="text-start">
                            <p className="text-muted">
                                <strong>Full Name :</strong> <span className="ms-2">Rakesh Sharma</span>
                            </p>

                            <p className="text-muted">
                                <strong>Mobile :</strong>
                                <span className="ms-2">(+12) 123 1234 567</span>
                            </p>

                            <p className="text-muted">
                                <strong>Email :</strong> <span className="ms-2">coderthemes@gmail.com</span>
                            </p>

                            <p className="text-muted">
                                <strong>Location :</strong> <span className="ms-2">USA</span>
                            </p>

                            <p className="text-muted">
                                <strong>Languages :</strong>
                                <span className="ms-2"> English, German, Spanish </span>
                            </p>
                            <p className="text-muted mb-0">
                                <strong>Elsewhere :</strong>
                                <Link className="d-inline-block ms-2 text-muted" to="#">
                                    <i className="mdi mdi-facebook"></i>
                                </Link>
                                <Link className="d-inline-block ms-2 text-muted" to="#">
                                    <i className="mdi mdi-twitter"></i>
                                </Link>
                                <Link className="d-inline-block ms-2 text-muted" to="#">
                                    <i className="mdi mdi-skype"></i>
                                </Link>
                            </p>
                        </div>
                    </Card.Body>
                </Card>

            </Col>
        </>
    )
}

export default MyAccount;