import React, { Component, PropTypes } from 'react'
import TreeNode from './TreeNode';
import _ from 'lodash';
import {
    passDownProps,
    mapTree,
    findNodeById,
    collapseBranch,
    collapseBranchChildren,
    expandBranch,
    expandBranchChildren
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
    handleCheck(e) {
        let newState = _.clone(this.state.data);
        let node = findNodeById(newState,parseInt(e.target.dataset.id, 10));
        node.checked = !node.checked;
        this.setState({ data: newState });
    }
    handleDoubleClick(e) {
        let newState = _.clone(this.state.data);
        let node = findNodeById(newState,parseInt(e.target.dataset.id, 10));
        if(node.expanded) {
            collapseBranchChildren(node);
        } else {
            expandBranchChildren(node);
        }
        this.setState({ data: newState });
        if(this.props.onExpandAll) {
            this.props.onExpandAll({ event: e, node: node });
        }
    }
    handleToggleClick(e) {
        let newState = _.clone(this.state.data);
        let node = findNodeById(newState,parseInt(e.target.dataset.id, 10));
        if(node.expanded) {
            collapseBranch(node);
        } else {
            expandBranch(node);
        }
        this.setState({data: newState});
        if(this.props.onExpand) {
            this.props.onExpand({ event: e, node: node });
        }
    }
    handleSelect(e) {
        let newState = _.clone(this.state.data);
        let node = findNodeById(newState,parseInt(e.target.dataset.id, 10));
        node.selected = !node.selected;
        this.setState({data: newState});
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
    onExpandAll: PropTypes.func
};
export default TreeView;

