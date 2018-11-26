/* eslint-disable no-unused-vars */
export const passDownProps = ({
    data,
    level,
    expanded,
    className,
    ...rest
    }) => rest;
export const domProps = ({
    data,
    level,
    expanded,
    handleToggleClick,
    handleDoubleClick,
    handleCheck,
    onExpand,
    draggable,
    selectable,
    onDragStart,
    onDrag,
    onDragEnd,
    checkable,
    checkableLevel,
    onCheck,
    handleSelect,
    ...rest
    }) => rest;
/* eslint-enable no-unused-vars */
export const mapTree = (root, callback) => {
    root.forEach((node) => {
        callback(node);
        if(node.children) {
            return mapTree(node.children, callback);
        }
    });
    return root;
};
export const findNodeById = (nodes, id)  => {
    let result;
    nodes.forEach(node => {
        if(node.id === id) {
            result = node;
        } else if(node.children) {
            result = findNodeById(node.children, id) || result;
        }
    });
    return result;
};
export const collapseBranch = (node) => {
    node.expanded = false;
};
export const collapseBranchChildren = (node) => {
    if(node.children) {
        collapseBranch(node);
        node.children.forEach(c => collapseBranchChildren(c));
    }
};
export const expandBranch = (node) => {
    node.expanded = true;
};
export const expandBranchChildren = (node) => {
    if(node.children) {
        expandBranch(node);
        node.children.forEach(c => expandBranchChildren(c));
    }
};