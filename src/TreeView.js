import React, { Component } from 'react'
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';
import {
  passDownProps,
  findNodeById,
  collapseBranch,
  collapseBranchChildren,
  expandBranch,
  expandBranchChildren
} from './utilities';
import CheckElement from './components/CheckElement';
import LinkElement from './components/LinkElement';


class TreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  handleCheck = (e) => {
    const data = this.state.data.slice(0);
    const node = findNodeById(data, parseInt(e.target.dataset.id, 10));
    node.checked = !node.checked;
    this.setState({data});
  };
  handleDoubleClick = (e) => {
    e.preventDefault();
    const data = this.state.data.slice(0);
    const node = findNodeById(data, parseInt(e.target.dataset.id, 10));
    if (node.expanded) {
      collapseBranchChildren(node);
    } else {
      expandBranchChildren(node);
    }
    this.setState({data});
    if (this.props.onExpandAll) {
      this.props.onExpandAll(e, node);
    }
  };
  handleToggleClick = (e) => {
    e.preventDefault();
    const data = this.state.data.slice(0);
    const node = findNodeById(data, parseInt(e.target.dataset.id, 10));
    if (node.expanded) {
      collapseBranch(node);
      if (this.props.onCollapse) {
        this.props.onCollapse(e, node);
      }
    } else {
      expandBranch(node);
      if (this.props.onExpand) {
        this.props.onExpand(e, node);
      }
    }
    this.setState({data});

  };
  handleSelect = (e) => {
    e.preventDefault();
    const data = this.state.data.slice(0);
    const node = findNodeById(data, parseInt(e.target.dataset.id, 10));
    node.selected = !node.selected;
    this.setState({data});
  };

  render() {
    const {data} = this.state;
    return (
      <ul className="tree-root">
        {data.map(d => (
          <TreeNode
            key={d.id}
            data={d}
            handleSelect={this.handleSelect}
            handleToggleClick={this.handleToggleClick}
            handleDoubleClick={this.handleDoubleClick}
            handleCheck={this.handleCheck}
            CheckElement={this.props.CheckElement || CheckElement}
            LinkElement={this.props.LinkElement || LinkElement}
            level={0}
            expanded={d.expanded}
            {...passDownProps(this.props)}
          />
        ))}
      </ul>
    );
  }
}
TreeView.defaultProps = {
  data: []
};
TreeView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  selectable: PropTypes.bool,
  checkable: PropTypes.bool,
  onCheck: PropTypes.func,
  onCollapse: PropTypes.func,
  draggable: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onExpand: PropTypes.func,
  onExpandAll: PropTypes.func,
  animation: PropTypes.bool,
  CheckElement: PropTypes.element,
  LinkElement: PropTypes.element
};
export default TreeView;