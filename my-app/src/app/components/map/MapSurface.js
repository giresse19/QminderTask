import React, { Component } from "react"
import { compose } from "recompose"
import { CLIENT_ID, CLIENT_SECRET, SERVERURL, VERSION, latlong, latlongbs, radius } from '../../config/config.dev';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    /*     <GoogleMap defaultZoom={8} defaultCenter={{ lat: 58.378025, lng: 26.728493 }}>
          {props.markers.map(marker => {
            const onClick = props.onClick.bind(this, marker)
            return (
              <Marker
                key={marker.id}
                onClick={onClick}
                position={{ lat: marker.location.lat, lng: marker.location.lng }}
              >
                {props.selectedMarker === marker &&
                  <InfoWindow>
                    <div>
                      {marker.name}
                    </div>
                  </InfoWindow>}
                }
              </Marker>
            )
          })}
        </GoogleMap> */
    null
  )
})

export default class ShelterMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filtered: [],
      selectedMarker: false,
    }
  }

  componentDidMount() {
    this.mapData();
  }

  handleClick = (marker, event) => {
    this.setState({ selectedMarker: marker })
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

            for (var i = 0; i < MoreVenues.length; i++) {
              let matchFound = false;
              for (var j = 0; j < smallVenues.length; j++) {
                if (smallVenues[j].id === MoreVenues[i].id) {
                  matchFound = true;
                  break;
                }
              }
              if (!matchFound) {
                filteredName.push(MoreVenues[i]);
              }
            }
            debugger;
            console.log(filteredName);
            return filteredName;
          })
      })
      .then(filteredName => {      
       this.setState({
          filtered: filteredName
        })
      })
  }

  render() {
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.filtered}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}