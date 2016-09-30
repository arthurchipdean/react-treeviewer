import React, { Component, PropTypes } from 'react'
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import TreeNodeAnchor from './TreeNodeAnchor';
import {
    passDownProps
} from './utilities';

class TreeNode extends Component {
    getNodeSelector(child) {
        let {
            data,
            handleDoubleClick
            } = this.props;
        return (
            <TreeNodeAnchor
               data-id={data.id}
               onClick={this.onSelect.bind(this)}
               onDoubleClick={handleDoubleClick}
               className="branch-toggle selector"
               onDragStart={this.onDragStart.bind(this)}
               onDrag={this.onDrag.bind(this)}
               onDragEnd={this.onDragEnd.bind(this)}
               selected={data.selected}
            >
                {child}
            </TreeNodeAnchor>
        );
    }
    getNodeExpander(child) {
        let {
            data,
            handleToggleClick,
            handleDoubleClick
            } = this.props;
        return (
            <TreeNodeAnchor
                id={data.id}
                expanded={data.expanded}
                onClick={handleToggleClick}
                onDoubleClick={handleDoubleClick}
                className="branch-toggle expander"
                onDragStart={this.onDragStart.bind(this)}
                onDrag={this.onDrag.bind(this)}
                onDragEnd={this.onDragEnd.bind(this)}
                selected={data.selected}
            >
                {child}
            </TreeNodeAnchor>
        );
    }
    getCheckbox(data) {
        return this.props.checkable ?
            <input
                data-id={data.id}
                type="checkbox"
                onChange={this.onCheck.bind(this)}
                checked={data.checked}
            /> :
            '';
    }
    getCollapsedIcon() {
        let icon = this.props.collapsedIcon;
        return  icon ? icon : 'plus-square-o';
    }
    getExpandedIcon() {
        let icon = this.props.expandedIcon;
        return  icon ? icon :  'minus-square-o';
    }
    getIcon() {
        let {
          icon,
          iconObj
          } = this.props.data;

        if(iconObj) {
            return (
                <span><FontAwesome {...iconObj} /> </span>
            );
        } else if(icon) {
            return (
              <span><FontAwesome name={icon} /></span>
            )
        }
        return '';
    }
    onDrag(e) {
        if(this.props.onDrag) {
            this.props.onDrag(e,this.props.data);
        }
    }
    onDragEnd(e) {
        if(this.props.onDragEnd) {
            this.props.onDragEnd(e,this.props.data);
        }
    }
    onSelect(e) {
        e.preventDefault();
        if (this.props.selectable) {
            this.props.handleSelect(e);
            if (this.props.onSelect) {
                this.props.onSelect(e, this.props.data);
            }
        }
    }
    onDragStart(e) {
        if(this.props.draggable && this.props.onDragStart) {
            this.props.onDragStart(e, this.props.data);
        }
    }
    onCheck(e) {
        this.props.handleCheck(e);
        if(this.props.onCheck) {
            this.props.onCheck(e, this.props.data);
        }
    }
    render() {
        let {
            data,
            level,
            checkable
            } = this.props;
        let {
            expanded,
            id,
            text
            } = data;
        let newLevel = level++;
        let hasChildren = data.children !== undefined  || data._children !== undefined;
        return (
          <li style={{marginLeft: !hasChildren && checkable ?  `${level*15+15}px` : `${level*15}px`}}>
              {hasChildren ?
                  (<div>
                      {this.getNodeExpander(
                          <FontAwesome
                              data-id={id}
                              name={expanded ? this.getExpandedIcon() : this.getCollapsedIcon()}
                          />
                      )}
                      {this.getCheckbox(data)}
                      {this.getIcon()}
                      {this.props.selectable ?
                          this.getNodeSelector(text) :
                          this.getNodeExpander(text)
                      }
                  </div>) :
                  (<div>
                      {this.getCheckbox(data)}
                      {this.getIcon()}
                      {this.getNodeSelector(text)}
                  </div>)
              }
              {data.children !== undefined ?
                  <ul className="tree-branch" key={_.uniqueId()}>
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
TreeNode.defaultProps = {
    data: {
        text: '',
        expanded: false,
        selected: false,
        checked: false
    }
};
TreeNode.propTypes = {
    data: PropTypes.shape({
        selected: PropTypes.bool,
        expanded: PropTypes.bool,
        checked: PropTypes.bool,
        id: PropTypes.number,
        text: PropTypes.string,
        icon: PropTypes.string,
        iconObj: PropTypes.shape({
            className: PropTypes.string,
            name: PropTypes.string,
            size: PropTypes.string,
            spin: PropTypes.bool,
            style: PropTypes.object
        })
    }),
    level: PropTypes.number,
    selectable: PropTypes.bool,
    checkable: PropTypes.bool,
    onCheck: PropTypes.func,
    draggable: PropTypes.bool,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
    handleToggleClick: PropTypes.func,
    handleDoubleClick: PropTypes.func,
    onSelect: PropTypes.func,
    handleCheck: PropTypes.func,
    handleSelect: PropTypes.func,
    collapsedIcon: PropTypes.string,
    expandedIcon: PropTypes.string

};
export default TreeNode;
