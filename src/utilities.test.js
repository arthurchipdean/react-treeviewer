import _ from 'lodash';
import * as u from './utilities';
let testData = [{id:1,children:[{id:3,children:[{id:5}]}]}];
let testProps = {
    selectable: true,
    fakeProp: 'blah',
    data: '',
    level: '',
    onDrag: ''
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
it('should collapse the branch', () => {
    let data = _.clone(testData);
    u.expandBranch(data);
    expect(data[0]).toBe(true);
});