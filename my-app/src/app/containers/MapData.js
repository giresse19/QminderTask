/* eslint-disable no-loop-func */
import React, { Component } from "react"
import { SERVERPICURL, API_KEY, CLIENT_ID, CLIENT_SECRET, SERVERURL, VERSION, latlong, latlongbs, radius } from '../config/config.dev';
import MapWithAMarker from '../components/map/MapWithAMarker';
import MapPicture from '../components/map/MapPicture';

import classes from './MapData.css'

export default class ShelterMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filtered: [],
      filteredBs: [],
      latestPicture: [],
      selectedMarker: false,
      defaultZoom: 12
    }
  }

  componentDidMount() {

    const Query = `Burger Joint`;
    const Url = `${SERVERURL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${latlong}&query=${Query}&v=${VERSION}`;
    const Urlbs = `${SERVERURL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${latlongbs}&query=${Query}&v=${VERSION}&radius=${radius}`;

    let self = this;
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

        let filteredData = [];
        let filteredDataBs = [];
        let latestPics = [];

        fetch(Urlbs)
          .then(function (response1) {
            return response1.json();
          })
          .then(function makeMap(json1) {
            dataBs = json1;
            let MoreVenues = dataT.response.venues;
            let smallVenues = dataBs.response.venues;

            for (var i = 0; i < MoreVenues.length; i++) {
              let matchFound = false;
              for (var j = 0; j < smallVenues.length; j++) {
                if (smallVenues[j].id === MoreVenues[i].id) {
                  matchFound = true;
                  filteredDataBs.push(smallVenues[j]);
                  break;
                }
              }
              if (!matchFound) {
                filteredData.push(MoreVenues[i]);
                async function fetchAsyncPic() {
                  let response = await fetch(`${SERVERPICURL}/${MoreVenues[i].id}/photos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${latlong}&query=${Query}&v=${VERSION}`);
                  let data = await response.json();
                  return data;
                }
                fetchAsyncPic()
                  .then((data) => {
                    if (data.response.photos.count > 0) {
                      latestPics.push(data.response.photos.items[0]);
                      console.log(latestPics);
                      /* data.response.photos.items[0].prefix + 'original' + data.response.photos.items[0].suffix */
                    }
                  })
                  .catch(reason => console.log(reason.message))
              }
            }
            self.setState({
              filtered: filteredData,
              latestPicture: latestPics,
              filteredBs: filteredDataBs
            })
          })
      })
  }

  handleClick = (marker, event) => {
    this.setState({ selectedMarker: marker })
  }

  render() {

    return (
      <div style={{ height: '90%', width: '100%' }}>
        <div  /* className="classes.MapData" */ style={{ height: '500px', width: '100%', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', padding: 1, margin: 'auto' }} >
          <MapWithAMarker
            selectedMarker={this.state.selectedMarker}
            markers={this.state.filtered}
            defaultZoom={this.state.defaultZoom}
            onClick={this.handleClick}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%`, }} />}
            containerElement={<div style={{ height: `100%`, width: "80%", marginLeft: 0 }} />}
            mapElement={<div style={{ height: `100%`, }} />}
            circles={this.state.filteredBs}
          />
        </div>
        <div  /* className="classes.MapPicture" */ style={{ padding: 1, justifyContent: 'space-between', height: '500px', display: 'flex', flexDirection: 'row', width: '100%', margin: 'auto' }}  >
          <MapPicture
            pictures={this.state.latestPicture}
          />
        </div>
      </div>
    )
  }
}