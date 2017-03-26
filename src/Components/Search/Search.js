import React from 'react';
import { connect } from 'react-redux';
import './Search.css';

import { Dropdown } from 'semantic-ui-react';

import * as VideoActions from '../../Actions/VideoActions';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { top: 0 };
  }

  componentDidMount() {
    const { header, headerContent } = this.refs;
    this.setState({ top: -(header.clientHeight - Math.ceil(headerContent.clientHeight) - 66) });
  }

  play = (id, i) => {
    this.props.dispatch(VideoActions.playById(id));

    var endQueue = this.props.youtube.results.items.slice(0, i);
    var beginQueue = this.props.youtube.results.items.slice(i);
    beginQueue.push("end_of_queue");
    var queue = beginQueue.concat(endQueue).map(item => {
      if(item==="end_of_queue") 
        return item; 
      else 
        return item.id.videoId;
    });
    this.props.dispatch(VideoActions.setQueue(queue));
  }

  render() {
    const headerStyle = {
      backgroundImage: `url(${this.props.image})`,
      top: `${this.state.top}px`,
    }
    return (
      <div id="Search">
        <div className={`header ${this.props.image ? 'large' : ''}`} ref="header" style={headerStyle}>
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
            this.props.results.map((item, i) => {
              return (
                <div className="item justify-content-center" key={item.id.videoId} draggable onDoubleClick={() => this.play(item.id.videoId, i)}>
                  <div className="ui tiny image" onClick={() => this.play(item.id.videoId)}>
                    <img className="ui small image" src={item.snippet.thumbnails.medium.url} />
                    <div className="overlay"><i className="big play icon"/></div>
                  </div>
                  <div className="middle aligned content">
                    {item.snippet.title}
                  </div>
                  <div className="flex align-items-center justify-content-center">
                    <Dropdown pointing="right" icon="ellipsis horizontal">
                      <Dropdown.Menu>
                        <Dropdown.Item text='Add to queue' icon="plus" />
                        <Dropdown.Item text='Add to playlist' icon="list" />
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
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
    youtube: store.youtube,
  }
})(Search);
