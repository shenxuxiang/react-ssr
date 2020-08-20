import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import './index.less';

export default class Main extends PureComponent {
  render() {
    return (
      <div className="ssr-main">
        <header className="ssr-navigator">
          <NavLink className="ssr-navigator-item" to="/home">home</NavLink>
          <NavLink className="ssr-navigator-item" to="/goods">goods</NavLink>
        </header>
        {
          React.Children.map(this.props.children, child => child)
        }
      </div>
    );
  }
}