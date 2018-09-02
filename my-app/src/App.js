import React, { Component } from 'react';

import Layout from './app/components/layout/layout'
import MapDisplay from './app/containers/MapDisplay'


class App extends Component {
  render() {
    return (
      <div>
       <Layout>        
        <MapDisplay />    
       </Layout>
      </div>
    );
  }
}

export default App;
