import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { passDownProps } from './utilities';

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false
    };
  }

  onDrag = (e) => {
    if (this.props.onDrag) {
      this.props.onDrag(e, this.props.data);
    }
  };

  onDragEnd = (e) => {
    if (this.props.onDragEnd) {
      this.props.onDragEnd(e, this.props.data);
    }
  };

  onSelect = (e) => {
    e.preventDefault();
    if (this.props.selectable) {
      this.props.handleSelect(e);
      if (this.props.onSelect) {
        this.props.onSelect(e, this.props.data);
      }
    }
  };

  onDragStart = (e) => {
    if (this.props.draggable && this.props.onDragStart) {
      this.props.onDragStart(e, this.props.data);
    }
  };

  onCheck = (e) => {
    this.props.handleCheck(e);
    if (this.props.onCheck) {
      this.props.onCheck(e, this.props.data);
    }
  };

  hoverOn = () => {
    this.setState({hovering: true});
  };

  hoverOff = () => {
    this.setState({hovering: false});
  };

  getLinkElement(child, isExpander) {
    const {onSelect, onDragStart, onDrag, onDragEnd} = this;

    const {
      data: {id, expanded, selected},
      handleToggleClick,
      handleDoubleClick,
      LinkElement
    } = this.props;
    return (
      <LinkElement
        {...{
          id: id,
          'data-id': id,
          onClick: isExpander ? handleToggleClick : this.onSelect,
          className: 'branch-toggle',
          onDoubleClick: handleDoubleClick,
          expanded,
          selected,
          onSelect,
          onDragStart,
          onDrag,
          onDragEnd
        }}>
        {child}
      </LinkElement>
    );
  }

  getCheckbox(data, level) {
    const { checkableLevel, CheckElement} = this.props;
    const checkable = this.props.checkable && (checkableLevel === undefined || checkableLevel < level);
    return checkable && (
      <CheckElement
        id={data.id}
        data={data}
        onCheck={this.onCheck}
        checked={data.checked}
      />);
  }

  getCollapsedIcon() {
    const icon = this.props.collapsedIcon;
    return icon ? icon : 'plus-square-o';
  }

  getExpandedIcon() {
    const icon = this.props.expandedIcon;
    return icon ? icon : 'minus-square-o';
  }

  getIcon() {
    const {icon, iconObj} = this.props.data;

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

  getChildren() {
    const {data: {expanded, children}, level} = this.props;

    if (!expanded) {
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
  icon = ({data}) => (
    <FontAwesome
      data-id={data.id}
      name={data.expanded ? this.getExpandedIcon() : this.getCollapsedIcon()}
    />
  );


  render() {
    const {data, data: {text, children}, level} = this.props;
    const hasChildren = children !== undefined;
    return (
      <li style={{marginLeft: '15px'}}>
        <div
          onMouseEnter={this.hoverOn}
          onMouseLeave={this.hoverOff}
          className={this.state.hovering ? 'tree-node-hovered' : ''}>
          {hasChildren && this.getLinkElement(this.icon(this.props), true)}
          {this.getCheckbox(data, level)}
          {this.getIcon()}
          {this.getLinkElement(text, false)}
        </div>
        {hasChildren && this.getChildren()}
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
