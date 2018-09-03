

import React from 'react'

import classes from './Toolbar.css'

const toolbar = (props) => (

  <header className={classes.Toolbar}>   
    <div ><strong> <h1>Venues </h1></strong> </div>    
    <div className= {classes.floated_div} >  Gathering data... </div>
  </header>
);

export default toolbar

/* style={{marginLeft:' 50px'}} */