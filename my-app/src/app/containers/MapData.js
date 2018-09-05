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

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getDataToChangeState();
    };

    getDataToChangeState = async () => {

        const Query = `Burger Joint`;
        const Url = `${SERVERURL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${latlong}&query=${Query}&v=${VERSION}`;
        const Urlbs = `${SERVERURL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${latlongbs}&query=${Query}&v=${VERSION}&radius=${radius}`;

        let dataBs = null;
        let dataT = null;
        let data = null;
        let filteredData = [];
        let filteredDataBs = [];
        let latestPics = [];

        try {
            let response = await fetch(Url)
            dataT = await response.json();
        } catch (err) { console.log(err) }

        try {
            let response1 = await fetch(Urlbs)
            dataBs = await response1.json();
        } catch (err) { console.log(err) }

        let MoreVenues = dataT.response.venues;
        let smallVenues = dataBs.response.venues;

        // getting data for joints out of 1000m from bus station
        for (let i = 0; i < MoreVenues.length; i++) {
            let matchFound = false;
            for (let j = 0; j < smallVenues.length; j++) {
                if (smallVenues[j].id === MoreVenues[i].id) {
                    matchFound = true;
                    filteredDataBs.push(smallVenues[j]);
                    break;
                }
            }
            if (!matchFound) {
                filteredData.push(MoreVenues[i]);
              
                // getting images off latest joints base on their id prop 
                try {
                    let responsePic = await fetch(`${SERVERPICURL}/${MoreVenues[i].id}/photos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${latlong}&query=${Query}&v=${VERSION}`);
                    data = await responsePic.json();         
                } catch (err) { console.log(err) }            
           
            if (data.response.photos.count > 0) {
                latestPics.push(data.response.photos.items[0]);
                latestPics.push(data.response.photos.items[0]);
                latestPics.push(data.response.photos.items[0]);
                latestPics.push(data.response.photos.items[0]);
                latestPics.push(data.response.photos.items[0]);
                latestPics.push(data.response.photos.items[0]);
                latestPics.push(data.response.photos.items[0]);
                latestPics.push(data.response.photos.items[0]);
                latestPics.push(data.response.photos.items[0]);
                latestPics.push(data.response.photos.items[0]);
                latestPics.push(data.response.photos.items[0]);
                latestPics.push(data.response.photos.items[0]);
            }            
        }}
                
        this.setState({
            filtered: [...this.state.filtered, ...filteredData],
            latestPicture: [...this.state.latestPicture, ...latestPics],
            filteredBs: [...this.state.filteredBs, ...filteredDataBs]
        })
    }

    handleClick = (marker) => {
        this.setState({ selectedMarker: marker })
    }

    render() {
        return (
            <div className={classes.mainContainer} >
                <div className={classes.mapContainer}>
                    <MapWithAMarker
                        selectedMarker={this.state.selectedMarker}
                        markers={this.state.filtered}
                        defaultZoom={this.state.defaultZoom}
                        onClick={this.handleClick}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: `100%`, }} />}
                        containerElement={<div style={{ height: `100%`, width: "100%" }} />}
                        mapElement={<div style={{ height: `100%`, }} />}
                        circles={this.state.filteredBs}
                    />
                </div>
                <div className={classes.picContainer} >
                    <MapPicture
                        pictures={this.state.latestPicture}
                    />
                </div>
            </div>
        )
    }
}