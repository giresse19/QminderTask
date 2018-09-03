import React, { Component } from 'react';

import Layout from './app/components/layout/layout'
import MapData from './app/containers/MapData'


class App extends Component {
  render() {
    return (
      <Layout>
        <MapData />
      </Layout>
    );
  }
}

export default App;
