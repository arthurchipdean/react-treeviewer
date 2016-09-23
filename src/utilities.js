export const passDownProps = ({
    data,
    level,
    expanded,
    ...rest
    }) => rest;
export const domProps = ({
    data,
    level,
    expanded,
    handleToggleClick,
    handleDoubleClick,
    onExpand,
    draggable,
    ...rest
    }) => rest;