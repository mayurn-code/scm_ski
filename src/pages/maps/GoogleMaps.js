// @flow
import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import mapsImage from "../../assets/images/maps/map.png"
import breakDownIcon from "../../assets/images/maps/BreakDownIcon.svg"
import stopIcon from "../../assets/images/maps/StopIcon.svg"
import runningIcon from "../../assets/images/maps/RunningIcon.svg"

// components
import PageTitle from '../../components/PageTitle';

const markers = [
    {
        id: 1,
        tripId: "123",
        status: "Breakdown",
        location: "Surat-Mumbai",
        truck: "HR02B1114, 16 Tyre Tipper",
        drivername: "Sachin",
        mobile: "7832778877",
        position: { lat: 28.524801727650743, lng: 77.21282954607055 }
    },
    {
        id: 2,
        tripId: "124",
        status: "Running",
        location: "Delhi-Mumbai",
        truck: "MH01B1234, 10 Tyre Tipper",
        drivername: "Mohan",
        mobile: "9344334433",
        position: { lat: 28.52893035132908, lng: 77.21982638830204 }
    },
    {
        id: 3,
        tripId: "130",
        status: "Stop",
        location: "Mumbai-Delhi",
        truck: "MH01B1234, 10 Tyre",
        drivername: "Madan",
        mobile: "7987347677",
        position: { lat: 28.53498449323001, lng: 77.20078839045365 }
    },
    {
        id: 4,
        tripId: "125",
        status: "Stop",
        location: "Pune-Mumbai",
        truck: "MP02B1234, 20 Tyre",
        drivername: "Vishal",
        mobile: "9848747387",
        position: { lat: 28.52029500746769, lng: 77.23050990555936 }
    }
];

const MapWithMarker = (props) => {
    const [selectedElement, setSelectedElement] = useState(null);

    const [activeMarker, setActiveMarker] = useState(null);
    const [tripDetails, setTripDetails] = useState({
        tripId: 0,
        status: "",
        location: "",
        truck: "",
        drivername: "",
        mobile: ""
    })

    const [showInfoWindow, setInfoWindowFlag] = useState(true);

    const handleActiveMarker = (marker, city) => {
        console.log(marker, 'Marker')
        console.log(city, 'city')
        console.log(activeMarker)
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };
    return (
        <Card>
            <Card.Body>

                <div className="gmaps" style={{ position: 'relative', overflow: 'hidden',height:"530px" }}>
                    <Map
                        google={props.google}
                        zoom={13}
                        initialCenter={{ lat: 28.524801727650743, lng: 77.21282954607055 }}
                        style={{ width: '100%', height: '100%', position: 'relative' }}
                        zoomControlOptions={{
                            position: props.google.maps.ControlPosition.LEFT_TOP,
                        }}>

                        {markers.map((element, index) => {
                            return (
                                <Marker
                                    key={index}
                                    title={element.name}
                                    position={{
                                        lat: element.position.lat,
                                        lng: element.position.lng
                                    }}
                                    onClick={(props, marker) => {
                                        setSelectedElement(element);
                                        setActiveMarker(marker);
                                    }}
                                    icon={
                                        element.status === "Running" ?
                                            runningIcon : element.status === "Breakdown"
                                                ? breakDownIcon : stopIcon}
                                />
                            );
                        })}
                        {selectedElement ? (
                            <InfoWindow
                                visible={showInfoWindow}
                                marker={activeMarker}
                                onCloseClick={() => {
                                    setSelectedElement(null);
                                }}
                            >
                                <div className='mapPopupStyle'>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p>Trip ID- {selectedElement.tripId}</p>
                                        <div style={{ textAlign: "right" }}>
                                            <p style={selectedElement.status === "Running" ? { color: 'green' } : selectedElement.status === "Breakdown" ? { color: 'red' } : { color: 'orange' }}>{selectedElement.status}</p>
                                        </div>

                                    </div>
                                    <p>{selectedElement.location}</p>
                                    <p>{selectedElement.truck}</p>
                                    <p>{selectedElement.drivername} - <a href={`tel:${selectedElement.mobile}`}>{selectedElement.mobile}</a></p>
                                </div>
                            </InfoWindow>
                        ) : null}

                    </Map>
                </div>
            </Card.Body >
        </Card >
    );
};


// const MapWithMarker = (props) => {
//     return (
//         <Card>
//             {/* <img src={truck}/> */}
//             <Card.Body>
//                 <div>
//                     <img src={mapsImage} style={{width:"100%"}}/>
//                     {/* <Map
//                         google={props.google}
//                         zoom={18}
//                         initialCenter={{ lat: 23.2667, lng: 77.4132 }}
//                         style={{ width: '100%', height: '100%', position: 'relative' }}
//                         zoomControlOptions={{
//                             position: props.google.maps.ControlPosition.LEFT_TOP,
//                         }}>
//                         <Marker
//                             icon={truckGoods}
//                             title={'This is Truck'}

//                             position={{ lat: 23.2667, lng: 77.4132 }}></Marker>
//                         <Marker
//                             icon={truckGoods}
//                             title={'This is Truck'}

//                             position={{ lat: 23.2520, lng: 77.4857 }}></Marker>
//                         <Marker
//                             icon={truckGoods}
//                             title={'This is Truck'}

//                             position={{ lat: 21.569874, lng: 81.5893798 }}></Marker>
//                     </Map> */}
//                 </div>
//             </Card.Body>
//         </Card>
//     );
// };




const GoogleMaps = (props) => {
    return <MapWithMarker google={props.google} />


};

export default (GoogleApiWrapper({
    apiKey: 'AIzaSyBob909HfYtlM3S1QLdcLgfZgwFhSRIWDc',
})(GoogleMaps): any);
