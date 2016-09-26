import React, { Component, PropTypes } from 'react'
import TreeNode from './TreeNode';
import _ from 'lodash';
import {
    passDownProps,
    mapTree
} from './utilities';

class TreeView extends Component {
    constructor(props) {
        super(props);
       let data = mapTree(props.data, (d) => {
            if(d.expanded !== true) {
                let children = d.children;
                d.children = undefined;
                return d._children = children;
            }
        });
        this.state = {
            data
        };
    }
    findNodeById(nodes, id) {
        let result;
        nodes.forEach(node => {
            if(node.id === id) {
                result = node;
            } else if(node.children || node._children !== undefined) {
                result = this.findNodeById(node.children || node._children, id) || result;
            }
        });
        return result;
    }
    collapseBranch(newState, node) {
        const collapse = node => {
            node.expanded = false;
            node._children = node.children;
            node.children = undefined;
            if(node._children) {
                collapse(node._children);
            }
        };
        collapse(node);
        this.setState(newState);
    }
    expandBranch(newState, node) {
        node.expanded = true;
        node.children = node._children;
        node._children = undefined;
        this.setState(newState);
    }
    expandBranchChildren(node) {
        node.expanded = true;
        node.children = node._children;
        node._children = undefined;
        if(node.children) {
            this.expandBranchChildren(node.children);
        }
    }
    handleCheck(e) {
        let newState = _.clone(this.state.data);
        let node = this.findNodeById(newState,parseInt(e.currentTarget.dataset.id, 10));
        node.checked = !node.checked;
        this.setState({ data: newState });
    }
    handleDoubleClick(e) {
        let newState = _.clone(this.state.data);
        let node = this.findNodeById(newState,parseInt(e.currentTarget.dataset.id, 10));
        if(node.expanded) {
            this.collapseBranch(newState, node);
        } else {
            this.expandBranchChildren(node);
        }
        this.setState({ data: newState });
    }
    handleToggleClick(e) {
        let newState = _.clone(this.state.data);
        let node = this.findNodeById(newState,parseInt(e.currentTarget.dataset.id, 10));
        if(node.expanded) {
            this.collapseBranch(newState, node);
        } else {
            this.expandBranch(newState, node);
        }
        if(this.props.onExpand) {
            this.props.onExpand({ event: e, node: node });
        }
    }
    handleSelect(e) {
        let newState = _.clone(this.state.data);
        let node = this.findNodeById(newState,parseInt(e.currentTarget.dataset.id, 10));
        node.selected = !node.selected;
        this.setState({date: newState});
    }
    render() {
        const { data } = this.state;
        return (
            <ul className="tree-root">
                {data.map((d, i) => (
                    <TreeNode
                        key={d.id}
                        data={d}
                        handleSelect={this.handleSelect.bind(this)}
                        handleToggleClick={this.handleToggleClick.bind(this)}
                        handleDoubleClick={this.handleDoubleClick.bind(this)}
                        handleCheck={this.handleCheck.bind(this)}
                        level={0}
                        data-expanded={d.expanded}
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
        text: PropTypes.string
    })).isRequired,
    selectable: PropTypes.bool,
    checkable: PropTypes.bool,
    onCheck: PropTypes.func,
    draggable: PropTypes.bool,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
};
export default TreeView;

