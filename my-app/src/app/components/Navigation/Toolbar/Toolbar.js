import React from 'react'

import classes from './Toolbar.css'

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div style={{padding:'5px' }}> Venues</div>      
    <div>
      Gathering data...
 </div>
  </header>
);

export default toolbar  