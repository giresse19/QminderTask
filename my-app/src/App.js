import React, { Component } from 'react';

import Layout from './app/components/layout/layout'
import MapDisplay from './app/containers/MapDisplay'
import MapSurface from './app/components/map/MapSurface'
import Maptrial from './app/components/map/Maptrial'


class App extends Component {
  render() {
    return (
      <div>
       <Layout>        
         {/* <MapDisplay /> */}
         {/* <MapSurface /> */} 
         <Maptrial /> 
       </Layout>
      </div>
    );
  }
}

export default App;
