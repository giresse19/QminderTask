import React, { Component } from 'react';
import { API_KEY, CLIENT_ID, CLIENT_SECRET, SERVERURL, VERSION, latlong, latlongbs, radius } from '../config/config.dev';
import { compose, withProps } from "recompose";
import {Circle, withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// import MapSurface from '../components/map/MapSurface';
 // const googleMapURL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places';

// map height for small resolution =  360px for small and for large resolution 800px....
class MapData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultZoom: 11,
      isMarkerShown: false,
    };    
  }

  componentDidMount() {
    this.mapData();
  }

  shouldComponentUpdate() {
    this.mapData();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  mapData = () => {
    // fetch data from tartu city and tartu bus stop(bs)
    const Query = `Burger Joint`;
    const Url = `${SERVERURL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${latlong}&query=${Query}&v=${VERSION}`;
    const Urlbs = `${SERVERURL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${latlongbs}&query=${Query}&v=${VERSION}&radius=${radius}`;

    let dataBs = null;
    let dataT = null;

    fetch(Url)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        dataT = json;
      })
      .then(function () {
        fetch(Urlbs)
          .then(function (response1) {
            return response1.json();
          })
          .then(function makeMap(json1) {
            dataBs = json1;
            let MoreVenues = dataT.response.venues;
            let smallVenues = dataBs.response.venues;
            let filteredName = [];
            let filteredLocaion = [];

            for (var i = 0; i < MoreVenues.length; i++) {
              let matchFound = false;
              for (var j = 0; j < smallVenues.length; j++) {
                if (smallVenues[j].id === MoreVenues[i].id) {
                  matchFound = true;
                  break;
                }
              }
              if (!matchFound) {
                filteredName.push(MoreVenues[i].name);
                filteredLocaion.push(MoreVenues[i].location);
              }
            }
            console.log(filteredName);
            console.log(filteredLocaion);
          })
      })
      .catch(error => console.warn(error));
  }

  render() {

    const MapSurface = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px`, width: '800px'  }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
        defaultZoom={this.state.defaultZoom}
        defaultCenter={{ lat: 58.378025, lng: 26.728493 }}        
      >
{/*  {props.markers.map((marker, index)=> {
      return (
        <Marker
          position={marker}
          title="Click to zoom"
          onClick={props.handleMarkerClick}
        />
      ) */}
        <Marker
         position={{ lat: 58.37089920043945, lng: 26.760269165039062 }}
          title="Click for Name"
          onClick={props.handleMarkerClick}
        />
        <Marker
           position={{ lat:  58.366600623418385, lng: 26.70389632235069 }}
          title="Click for Name"
          onClick={props.handleMarkerClick}
        />
        <Marker
          position={{ lat:  58.385573, lng: 26.694673 }}
          title="Click for Name"
          onClick={props.handleMarkerClick}
        />
      </GoogleMap>
    ));

    return (
      <div>
        <MapSurface
             isMarkerShown={this.state.isMarkerShown}
             onMarkerClick={this.handleMarkerClick} />
      </div>
    );
  }
}
export default MapData;


