import React from 'react';
import './Modal.css';

import { Dimmer } from 'semantic-ui-react';
import OnClickOutside from 'react-onclickoutside';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.modal && !this.modal.contains(event.target)) {
      this.props.onHide();
    }
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        component='div'
        id='Modal'
        transitionName='modal'
        transitionEnterTimeout={250}
        transitionLeaveTimeout={200}>
        { this.props.show &&
          <div className="modal">
            <div>
              <div className="ui card" ref={(node) => (this.modal = node)}>
                <div className="content">
                  <a className="right floated meta" onClick={this.props.onHide}>&times;</a>
                  <div className="header">{this.props.title}</div>
                </div>
                <div className="content">
                  {
                    React.Children.map(this.props.children, child => {
                      return React.cloneElement(child, {
                        onHide: this.props.onHide
                      })
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </ReactCSSTransitionGroup>
    )
  }
}
