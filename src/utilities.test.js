import * as u from './utilities';
let testData = [{children:[{children:[{}]}]}];
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