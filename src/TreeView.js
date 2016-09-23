import React, { Component, PropTypes } from 'react'
import TreeNode from './TreeNode';
import _ from 'lodash';
import {
    passDownProps
} from './utilities';

class TreeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        };
    }
    findNodeById(nodes, id) {
        let result;
        nodes.forEach(node => {
            if(node.id === id) {
                result = node;
            } else if(node.children !== undefined) {
                result = this.findNodeById(node.children, id) || result;
            }
        });
        return result;
    }
    collapseBranch(newState, node) {
        const collapse = node => {
            node.expanded = false;
            if(node.children) {
                collapse(node.children);
            }
        };
        collapse(node);
        this.setState(newState);
    }
    expandBranch(newState, node) {
        node.expanded = true;
        this.setState(newState);
    }
    expandBranchChildren(node) {
        node.expanded = true;
        if(node.children) {
            this.expandBranchChildren(node.children);
        }
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
            this.expandBranch(newState, node)
        }
        if(this.props.onExpand) {
            this.props.onExpand({ event: e, node: node });
        }
    }
    render() {
        const { data } = this.state;
        return (
            <ul className="tree-root tree-branch">
                {data.map((d, i) => (
                    <TreeNode
                        key={d.id}
                        data={d}
                        handleToggleClick={this.handleToggleClick.bind(this)}
                        handleDoubleClick={this.handleDoubleClick.bind(this)}
                        level={0}
                        data-expanded={!!d.expanded}
                        {...passDownProps(this.props)}
                    />
                ))}
            </ul>
        )
    }
}
TreeView.propTypes = {
    data: PropTypes.array
};
export default TreeView;

