import React from 'react';
import { connect } from 'react-redux';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { top: 0 };
  }

  componentDidMount() {
    const { header, headerContent } = this.refs;
    this.setState({ top: -(header.clientHeight - headerContent.clientHeight - 64) });
  }

  render() {
    const headerStyle = {
      backgroundImage: `url(${this.props.image})`,
      top: `${this.state.top}px`,
    }
    return (
      <div id="Search">
        <div className="header" ref="header" style={headerStyle}>
          <div className="header-content" ref="headerContent">
            <div>
              <h3>{this.props.label}</h3>
              <h1>{this.props.title}</h1>
            </div>
            <div>
              <button className="ui green labeled icon button">
                <i className="play icon" />Play
              </button>
            <button className="ui right labeled icon button">
              <i className="plus icon" />Follow
            </button>
            </div>
          </div>
        </div>
        <div className="ui inverted divided items" style={{ padding: '2em', color: 'lightgrey' }}>
          {
            this.props.results.map(i => {
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

export default connect(store => {
  return {

  }
})(Search);
