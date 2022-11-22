import { Button, Card, Col, Row } from "react-bootstrap";
import PageTitle from "../../../components/PageTitle";
import GoogleMaps from "../../maps/GoogleMaps";

const TrackingDashboardPage = () => {

    const styleBox = {
        borderBottom: "1px solid rgba(152, 166, 173, .2)",
        marginBottom: "0",
        boxShadow: "none"
    }
    const styleForFilter = {
        position: "absolute",
        // textAlign: "right",
        top: "84px",
        right: "5px"
    }
    return (
        <>
            <PageTitle
                breadCrumbItems={[

                ]}
                title={"Vehicle Tracking"}
            />

            <Row>
                <Col sm={5}>

                </Col>
                <Col sm={7} style={styleForFilter}>
                    <Row>
                        <Col sm="5">

                        </Col>
                        <Col  sm="5">
                            <input className="form-control" placeholder="Search... Order ID, Trips / Truck" />
                        </Col>
                        <Col sm="2">
                            <Button style={{padding:"0.45rem 0.5rem"}} variant="danger">All Drivers
                                <i className="mdi mdi-18px mdi-arrow-down-drop-circle-outline" style={{marginLeft:"2px"}}></i>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col lg={3}>
                    <Card className="tilebox-one" style={styleBox}>
                        <Card.Body>
                            <h4 className="my-2" id="active-users-count">
                                RJ38GA08
                            </h4>
                            <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                    <span className="mdi mdi-map-marker-radius mdi-18px"></span>
                                </span>
                                <span className="text-wrap">Nawa City, Kuchaman Road,Jaipur,Rajsthan, 221401</span>
                            </p>
                            <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                    <span className="mdi mdi-account mdi-18px"></span>
                                </span>
                                <span className="text-nowrap">Balvindar Singh</span>
                            </p>
                        </Card.Body>
                    </Card>
                    <Card className="tilebox-one" style={styleBox}>
                        <Card.Body>
                            <h4 className="my-2" id="active-users-count">
                                MH47WK58
                            </h4>
                            <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                    <span className="mdi mdi-map-marker-radius mdi-18px"></span>
                                </span>
                                <span className="text-wrap">Nawa City, Kuchaman Road,Jaipur,Rajsthan, 221401</span>
                            </p>
                            <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                    <span className="mdi mdi-account mdi-18px"></span>
                                </span>
                                <span className="text-nowrap">Himanshu Singh</span>
                            </p>
                        </Card.Body>
                    </Card>
                    <Card className="tilebox-one" style={styleBox} >
                        <Card.Body>
                            <h4 className="my-2" id="active-users-count">
                                MP45BP68
                            </h4>
                            <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                    <span className="mdi mdi-map-marker-radius mdi-18px"></span>
                                </span>
                                <span className="text-wrap">Nawa City, Kuchaman Road,Jaipur,Rajsthan, 221401</span>
                            </p>
                            <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                    <span className="mdi mdi-account mdi-18px"></span>
                                </span>
                                <span className="text-nowrap">Prakash Singh</span>
                            </p>
                        </Card.Body>
                    </Card>
                    <Card className="tilebox-one" style={styleBox} >
                        <Card.Body>
                            <h4 className="my-2" id="active-users-count">
                                UK64GB58
                            </h4>
                            <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                    <span className="mdi mdi-map-marker-radius mdi-18px"></span>
                                </span>
                                <span className="text-wrap">Nawa City, Kuchaman Road,Jaipur,Rajsthan, 221401</span>
                            </p>
                            <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                    <span className="mdi mdi-account mdi-18px"></span>
                                </span>
                                <span className="text-nowrap">Rakesh Verma</span>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={9} style={{ padding: "0" }}>

                    <Row>

                    </Row>
                    <GoogleMaps />
                </Col>
            </Row>
        </>
    )
}

export default TrackingDashboardPage;