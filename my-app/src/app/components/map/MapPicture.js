import React from 'react';
import classes from './MapPicture.css'

const MapPicture = (props) => {
    
    return (
        <div className={classes.pictureStyle}>

            {props.pictures.map(picture => {
                return (
                    <img
                        className={classes.individualPic}
                        key={picture.id + Math.random() + Math.random()}
                        src={[picture.prefix + 'original' + picture.suffix]}
                        alt={"burger"}
                    />
                )
            })}
        </div>
    )
};

export default MapPicture;
