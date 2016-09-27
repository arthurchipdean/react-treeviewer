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
    onCheck,
    handleSelect,
    ...rest
    }) => rest;
export const mapTree = (root, callback) => {
    root.forEach((node) => {
        callback(node);
        if(node.children || node._children) {
            return mapTree(node.children || node._children, callback);
        }
    });
    return root;
};
export const findNodeById = (nodes, id)  => {
    let result;
    nodes.forEach(node => {
        if(node.id === id) {
            result = node;
        } else if(node.children || node._children !== undefined) {
            result = findNodeById(node.children || node._children, id) || result;
        }
    });
    return result;
};
export const collapseBranch = (node) => {
    node.expanded = false;
    node._children = node.children;
    node.children = [];
};
export const collapseBranchChildren = (node) => {
    if(node.children) {
        collapseBranch(node);
        node._children.forEach(c => collapseBranchChildren(c));
    }
};
export const expandBranch = (node) => {
    node.expanded = true;
    node.children = node._children;
    node._children = undefined;
};
export const expandBranchChildren = (node) => {
    if(node._children) {
        expandBranch(node);
        node.children.forEach(c => expandBranchChildren(c));
    }
};