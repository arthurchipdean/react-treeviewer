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