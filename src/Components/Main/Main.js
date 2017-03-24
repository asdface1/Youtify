import React from 'react';
import './Main.css';

import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';

export default class Main extends React.Component {
  render() {
    return (
      <div id="Main">
        <Navbar user={{ name: 'Jorge Iglesias' }} />
        <Search
          label="Search results for:"
          title="Katy Perry"
          image="//yt3.ggpht.com/GPTRffZJ1dgjac5CN90pwxhMzYjZSh5iC5JnlQVPickZiW3gP6B6GiUsGnjoMkbz8kXu1CpZOjs=w2120-fcrop64=1,00005a57ffffa5a8-nd-c0xffffffff-rj-k-no"
          results={[...Array(12).keys()]} />
      </div>
    )
  }
}