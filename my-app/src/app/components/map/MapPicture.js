import React from 'react';

const MapPicture = (props => {
  console.log(props);
  return (
    <div className="pictureContainer">
      <div>
        {props.pictures.map(picture => {
          return (
            { picture }
          )
        })}
      </div>
    </div>
  );
})
export default MapPicture;
