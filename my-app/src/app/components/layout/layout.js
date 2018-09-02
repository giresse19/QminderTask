import React from 'react';

import Wrapper from '../../hComp/Wrapper';

const layout = (props) => (
 <Wrapper>
     <div> Toolbar, Backdrop</div>
     <main>
         {props.children}
     </main>
 </Wrapper>
);
export default layout;

/* mapData = () => {
    // fetch data from tartu city and tartu bus stop(bs)
    const Query = `Burger Joint`;
    const Url = `${SERVERURL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${latlong}&query=${Query}&v=${VERSION}`;
    const Urlbs = `${SERVERURL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${latlongbs}&query=${Query}&v=${VERSION}&radius=${radius}`;

    let dataBs = null;
    let dataT = null;

    fetch(Url)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        dataT = json;
      })
      .then(function () {
        fetch(Urlbs)
          .then(function (response1) {
            return response1.json();
          })
          .then(function (json1) {
            dataBs = json1;
            let MoreVenues = dataT.response.venues;
            let smallVenues = dataBs.response.venues;
            let newFiltered = this.state.filtered.slice()
            let filteredData = [];

            for (var i = 0; i < MoreVenues.length; i++) {
              let matchFound = false;
              for (var j = 0; j < smallVenues.length; j++) {
                if (smallVenues[j].id === MoreVenues[i].id) {
                  matchFound = true;
                  break;
                }
              }
              if (!matchFound) {
                newFiltered.push(MoreVenues[i]);
              }
            }
            return newFiltered
          })
      })
      .then(newFiltered => {
        console.log(newFiltered);
        debugger;
        this.setState({
          filtered: newFiltered
        })
      })
  } */