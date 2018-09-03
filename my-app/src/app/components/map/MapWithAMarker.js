import React from "react"
import { compose } from "recompose"
import {
  Circle,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
  
  return (
    <GoogleMap defaultZoom={props.defaultZoom} defaultCenter={{ lat: 58.378025, lng: 26.728493 }}>
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
          </Marker>
        )
      })}
      {props.circles.map(circle => {
        return (
          <Circle
            key={circle.id}
            defaultCenter={{ lat: 58.3780, lng: 26.7321 }}
            defaultRadius={1000}
            strokeColor={'#FF0000'}
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor={'#FF0000'}
            fillOpacity={0.35}
          />
        )
      })}
    </GoogleMap>
  )
})
export default MapWithAMarker;