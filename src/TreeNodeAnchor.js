import React, { Component, PropTypes } from 'react'
import _ from 'lodash';
import {
    passDownProps,
} from './utilities';

class TreeNodeAnchor extends Component {
    render() {
        let {
            id,
            className,
            selected,
            children
            } = this.props;
        return (
            <a href="#"
               data-id={id}
               className={`${className} ${selected ? 'ad-selected-node' : ''}`}
                {...passDownProps(this.props)}
            >
                {children}
            </a>
        );
    }
}
TreeNodeAnchor.propTypes = {
    id: PropTypes.number,
    expanded: PropTypes.bool
};
export default TreeNodeAnchor;