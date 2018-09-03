
import React from "react";

import { withGoogleMap, GoogleMap } from "react-google-maps"
import _ from "lodash";

import {  configure, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

const MapWithAMarker = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={12}
    defaultCenter={{ lat: 58.378025, lng: 26.728493 }}
    onClick={props.onMapClick}
  />
));

describe(`GoogleMap`, () => {
  it(`should render`, () => {
    const googleMap = shallow(
      <MapWithAMarker
        containerElement={
          <div style={{ height: `100%`  }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        onMapLoad={_.noop}
        onMapClick={_.noop}
      />
    );
    let tree = shallowToJson(googleMap);
    expect(tree).toMatchSnapshot();
  });
});