import React from 'react';
// import classes from './MapPicture.css'

const MapPicture = (props) => (
  <div style={{justifyContent: 'space-evenly', height: '100px',  width: '25%', margin: 'auto' }}>
    {props.pictures.map(picture =>
      <img
        key={picture.id}
        src={[picture.prefix + 'original' + picture.suffix]}
        alt={"burger"}      
        style={{ width: '100%', height: '100px', padding: '5', position:'relative'}}  
      />
    )}
  </div>
);
export default MapPicture;
