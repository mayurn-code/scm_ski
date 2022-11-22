import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import GoogleMaps from '../pages/maps/GoogleMaps'
import PageTitle from './PageTitle'

const TrackTruckMap = () => {
    // const styleBox = {
    //     borderBottom: "1px solid rgba(152, 166, 173, .2)",
    //     marginBottom: "0",
    //     boxShadow: "none"
    // }
    return (
        <>
            <Col lg={6}>
                <Card className="tilebox-one">
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
            </Col>
            <Col lg={12}>
                <GoogleMaps showFilter={false} />
            </Col>
        </>
    )
}

export default TrackTruckMap;