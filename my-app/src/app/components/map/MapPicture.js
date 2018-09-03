import React from 'react';

const MapPicture = (props) => (
  <div>
    {props.pictures.map(picture =>
      <img
        key={picture.id}
        src={[picture.prefix + 'original' + picture.suffix]}
        alt={"burger"}
        style={{ width: 100, height: 100, position: 'absolute' }}
      />
    )}
  </div>
);
export default MapPicture;
