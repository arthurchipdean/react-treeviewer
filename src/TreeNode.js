import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import TreeNodeAnchor from './components/TextElement';
import Collapse from 'react-collapse';
import {
  passDownProps
} from './utilities';

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false
    };
  }

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
        selected={data.selected}>
        {child}
      </TreeNodeAnchor>
    );
  }

  getCheckbox(data, level) {
    const checkable = this.props.checkable && (
      this.props.checkableLevel === undefined ||
      this.props.checkableLevel < level
    );
    const CheckElement = this.props.checkElement;
    return checkable && (
      <CheckElement
        id={data.id}
        data={data}
        onCheck={this.onCheck.bind(this)}
        checked={data.checked}
      />);
  }

  getCollapsedIcon() {
    let icon = this.props.collapsedIcon;
    return icon ? icon : 'plus-square-o';
  }

  getExpandedIcon() {
    let icon = this.props.expandedIcon;
    return icon ? icon : 'minus-square-o';
  }

  getIcon() {
    const { icon, iconObj } = this.props.data;

    if (iconObj) {
      return (
        <span><FontAwesome {...iconObj} /> </span>
      );
    } else if (icon) {
      return (
        <span><FontAwesome name={icon}/></span>
      )
    }
    return '';
  }

  onDrag(e) {
    if (this.props.onDrag) {
      this.props.onDrag(e, this.props.data);
    }
  }

  onDragEnd(e) {
    if (this.props.onDragEnd) {
      this.props.onDragEnd(e, this.props.data);
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
    if (this.props.draggable && this.props.onDragStart) {
      this.props.onDragStart(e, this.props.data);
    }
  }

  onCheck(e) {
    this.props.handleCheck(e);
    if (this.props.onCheck) {
      this.props.onCheck(e, this.props.data);
    }
  }

  getChildren() {
    const {data: {expanded, children}, animation, level} = this.props;

    if (!animation && !expanded) {
      return '';
    }
    return (
      <ul className="tree-branch">
        {children.map(child => (
          <TreeNode
            key={child.id}
            level={level + 1}
            data={child}
            {...passDownProps(this.props)}
            expanded={expanded}
          />
        ))}
      </ul>
    );
  }

  hoverOn = () => {
    this.setState({hovering: true});
  }
  hoverOff = () => {
    this.setState({hovering: false});
  }

  render() {
    const {
      data, data: {expanded, id, text},
      selectable,
      animation,
      level
    } = this.props;
    const hasChildren = data.children !== undefined;
    return (
      <li style={{marginLeft: '15px'}}>
        <div
          onMouseEnter={this.hoverOn}
          onMouseLeave={this.hoverOff}
          className={this.state.hovering ? 'tree-node-hovered' : ''}>
          {hasChildren && this.getNodeExpander(
            <FontAwesome
              data-id={id}
              name={expanded ? this.getExpandedIcon() : this.getCollapsedIcon()}
            />
          )}
          {this.getCheckbox(data, level)}
          {this.getIcon()}
          {selectable || hasChildren ?
            this.getNodeSelector(text) :
            this.getNodeExpander(text)
          }
        </div>
        {hasChildren && animation &&
        <Collapse isOpened={!!expanded}>
          {this.getChildren()}
        </Collapse>
        }
        {hasChildren && !animation && this.getChildren()}
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
  expandedIcon: PropTypes.string,
  animation: PropTypes.bool
};
export default TreeNode;
