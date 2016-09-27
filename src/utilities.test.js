import _ from 'lodash';
import * as u from './utilities';
let testData = [{id:1,children:[{id:3,children:[{id:5}]}]}];
let testCollapsedData = [{id:1,_children:[{id:3,_children:[{id:5}]}]}];
let testProps = {
    selectable: true,
    fakeProp: 'blah',
    data: '',
    level: '',
    onDrag: ''
};
let testPropsTwo = {
    data: '',
    level: '',
    expanded: '',
    handleToggleClick: '',
    handleDoubleClick: '',
    handleCheck: '',
    onExpand: '',
    draggable: ''
};
it('visits each tree node and calls callback', () => {
    let visit = 0;
    u.mapTree(testData, () => {visit++;});
    expect(visit).toBe(3);
});
it('leaves domProps', () => {
    let domProps = u.domProps(testProps);
    expect(domProps).toEqual({
        fakeProp: 'blah'
    });
    domProps = u.domProps(testPropsTwo);
    expect(domProps).toEqual({});
});
it('leaves pass down props', () => {
   let  passDownProps = u.passDownProps(testProps);
    expect(passDownProps).toEqual({
        fakeProp: 'blah',
        onDrag: '',
        selectable: true
    });
});
it('should find the right node', () => {
    let  node = u.findNodeById(testData, 5);
    expect(node).toEqual({
        id: 5
    });
});
it('should expand the branch', () => {
    let fixture = _.cloneDeep(testCollapsedData);
    u.expandBranch(fixture[0]);
    expect(fixture[0].expanded).toBe(true);
    expect(fixture[0].children).toEqual([{"id":3,"_children":[{"id":5}]}]);
    expect(fixture[0]._children).toEqual(undefined);
});
it('should collapse the branch', () => {
    let fixture = _.cloneDeep(testData);
    u.collapseBranch(fixture[0]);
    expect(fixture[0].expanded).toBe(false);
    expect(fixture[0].children).toEqual(undefined);
});
it('should collapse a branch and the children', () => {
    let fixture = _.cloneDeep(testData);
    u.collapseBranchChildren(fixture[0]);
    expect(fixture[0]._children[0]._children[0].id).toBeDefined();
    expect(fixture[0].expanded).toBe(false);
});
it('should expand a branch and the children', () => {
    let fixture = _.cloneDeep(testCollapsedData);
   u.expandBranchChildren(fixture[0]);
    expect(fixture[0].children[0].children[0].id).toBeDefined();
});