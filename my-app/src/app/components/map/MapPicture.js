import React from 'react';

import classes from './MapPicture.css'

const MapPicture = (props) => (
  <div /*className="classes.MapPictureBox"*/  >
    {props.pictures.map(picture =>
      <img
        key={picture.id}
        src={[picture.prefix + 'original' + picture.suffix]}
        alt={"burger"}      
        style={{ width: '25%', height: '100x', padding: '5', position:'relative', marginRight:'20px'}}  
      />
    )}
  </div>
);
export default MapPicture;
