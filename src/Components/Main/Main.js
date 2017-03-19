import React from 'react';
import './Main.css';

export default class Main extends React.Component {
  render() {
    return (
      <div id="Main">
        <div className="header" style={{backgroundImage: 'url("http://img.wennermedia.com/social/rs-216958-GettyImages-74253358.jpg")'}}>
          <div className="header-content">
            <h1>Beach Boys</h1>
          </div>
        </div>
        <div className="ui inverted divided items" style={{ padding: '2em', color: 'lightgrey' }}>
          {
            [...Array(12).keys()].map(i => {
              return (
                <div className="item justify-content-center" key={i} draggable>
                  <div className="ui tiny image">
                    <img src="http://www.roadtovr.com/wp-content/uploads/2015/03/youtube-logo2.jpg" alt="" />
                  </div>
                  <div className="middle aligned content">
                    Song {i}
                  </div>
                  <div className="flex align-items-center justify-content-center">3:{14 + i}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
