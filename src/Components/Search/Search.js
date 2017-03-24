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

  play = (id) => {
    this.props.dispatch(VideoAction.playById(id));
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
            this.props.results.map(item => {
              return (
                <div className="item justify-content-center" key={item.id.videoId} draggable onDoubleClick={() => this.play(item.id.videoId)}>
                  <div className="ui tiny image">
                    <img src={item.snippet.thumbnails.high.url} alt="" />
                  </div>
                  <div className="middle aligned content">
                    Song {item.snippet.title}
                  </div>
                  <div className="flex align-items-center justify-content-center"></div>
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
