import React from 'react';
// import classes from './MapPicture.css'

const MapPicture = (props) => (
  <div style={{justifyContent: 'space-evenly', height: 'auto',  width: '25%', padding: '10px' }}>
    {props.pictures.map(picture =>
      <img
        key={picture.id}
        src={[picture.prefix + 'original' + picture.suffix]}
        alt={"burger"}      
        style={{ width: '100%'}}  
      />
    )}
  </div>
);
export default MapPicture;
