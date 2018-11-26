import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {passDownProps} from '../utilities';

class TextElement extends Component {
  render() {
    const {
      id,
      className,
      selected,
      children
    } = this.props;
    return (
      <a href="#"
         data-id={id}
         className={`${className} ${selected ? 'ad-selected-node' : ''}`}
         {...passDownProps(this.props)}>
        {children}
      </a>
    );
  }
}

TextElement.propTypes = {
  id: PropTypes.number,
  expanded: PropTypes.bool,
  className: PropTypes.string,
  selected: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ])
};
export default TextElement;