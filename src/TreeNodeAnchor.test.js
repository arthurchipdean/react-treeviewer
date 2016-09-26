import React from 'react';
import ReactDOM from 'react-dom';
import TreeNodeAnchor from './TreeNodeAnchor';
import { shallow } from 'enzyme';
import sinon from 'sinon';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TreeNodeAnchor />, div);
});
it('calls onClick callback when clicked.', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(
        <TreeNodeAnchor onClick={onClick} />
    );
    wrapper.find('a').simulate('click');
    expect(onClick['callCount']).toBe(1);
});
it('calls onDoubleClick callback when double clicked.', () => {
    const onDoubleClick = sinon.spy();
    const wrapper = shallow(
        <TreeNodeAnchor onDoubleClick={onDoubleClick} />
    );
    wrapper.find('a').simulate('doubleclick');
    expect(onDoubleClick['callCount']).toBe(1);
});
it('renders children when passed in', () => {
    const wrapper = shallow(
        <TreeNodeAnchor>
            <div className="unique" />
        </TreeNodeAnchor>
    );
    expect(wrapper.contains(<div className="unique" />)).toBe(true);
});
it('displays the correct classname', () => {
   const wrapper = shallow(
       <TreeNodeAnchor
           selected={true}
           className={'test'}
       />
   );
    expect(wrapper.contains('test ad-selected-node'));
});