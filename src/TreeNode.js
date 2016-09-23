import React, { Component, PropTypes } from 'react'
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import {
    passDownProps,
    domProps
} from './utilities';

class TreeNode extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this['data-expanded'] !== nextProps['data-expanded']) {
            return true;
        }
        return false;
    }
    getBranchToggle(child) {
        let {
            data,
            handleToggleClick,
            handleDoubleClick
            } = this.props;
        return (
            <a  href="#"
                data-id={data.id}
                onClick={handleToggleClick}
                onDoubleClick={handleDoubleClick}
                className="branch-toggle"
                {...domProps(this.props)}
            >
                {child}
            </a>
        );
    }
    getStyles() {

    }
    render() {
        let {
            data,
            level
            } = this.props;
        let expanded = !!data.expanded;
        let newLevel = level++;
        return (
          <li style={{marginLeft: `${level*15}px`}}>
              {data.children !== undefined ?
                  (<div>
                      {this.getBranchToggle((<FontAwesome name={expanded ? 'minus-square-o' : 'plus-square-o'} />))}
                      {this.props.checkbox ? <input type="checkbox" /> : ''}
                      {this.getBranchToggle((<span>{data.text}</span>))}
                  </div>) :
                  (<a href="#"
                      data-id={data.id}
                      className="leaf"
                      {...domProps(this.props)}
                  >
                      <span>{data.text}</span>
                  </a>)
              }
              {data.children !== undefined ?
                  <ul className="tree-branch" style={{display:expanded ? 'block' : 'none'}} key={_.uniqueId()}>
                      {data.children.map(child => (
                          <TreeNode
                              key={_.uniqueId()}
                              level={newLevel}
                              data={child}
                              {...passDownProps(this.props)}
                              expanded={expanded}
                          />
                      ))}
                  </ul>
               : null}
          </li>
        );

    }
}
TreeNode.propTypes = {
    data: PropTypes.object,
    level: PropTypes.number
};
export default TreeNode;

