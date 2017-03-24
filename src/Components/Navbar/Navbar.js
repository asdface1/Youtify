import React from 'react';
import './Navbar.css';

import { Dropdown } from 'semantic-ui-react';

export default class Navbar extends React.Component {
  render() {
    const trigger = (
      <span>
        <i className="large user circle outline icon" size="big" /> {this.props.user.name}
      </span>
    )

    return (
      <nav id="Navbar">
        <div className="content">
          <div className="ui inverted left icon input">
            <input type="text" placeholder="Search..." />
            <i className="search icon" />
          </div>
          <Dropdown trigger={trigger} pointing>
            <Dropdown.Menu>
              <Dropdown.Item
                text="Settings" icon="settings" />
              <Dropdown.Item
                text="Sign out" icon="sign out" />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    )
  }
}
