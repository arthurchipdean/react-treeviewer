import React from 'react';
import ReactDOM from 'react-dom';
import TreeNode from './../src/TreeNode';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TreeNode />, div);
});

it('renders checkboxes when provided with checkbox props', () => {
    const div = document.createElement('div');
    const wrapper = shallow(
        <TreeNode
            checkable
        />
    );
    expect(wrapper.find('input[type="checkbox"]').length === 1).toBe(true);
});

it('checkboxes fire onChange prop', () => {
    const div = document.createElement('div');
    const onCheck  = sinon.spy();
    let data = {
        id: 12
    };
    const wrapper = shallow(
        <TreeNode
            handleCheck={() => {}}
            onCheck={onCheck}
            checkable
            data={data}
        />
    );
    wrapper.find('input[type="checkbox"]').simulate('change');
    expect(onCheck['callCount']).toBe(1);
    expect(wrapper.find('input[data-id=12]').length === 1).toBe(true);
});


it('fires drag properties', () => {
    const div = document.createElement('div');
    const onDragStart  = sinon.spy();
    const onDrag  = sinon.spy();
    const onDragEnd  = sinon.spy();
    let props = {
        onDragStart,
        onDrag,
        onDragEnd,
        draggable: true
    };
    const wrapper = mount(
        <TreeNode
            {...props}
        />
    );
    wrapper.find('a').simulate('dragstart');
    wrapper.find('a').simulate('drag');
    wrapper.find('a').simulate('dragend');

    expect(onDragStart['callCount']).toBe(1);
    expect(onDrag['callCount']).toBe(1);
    expect(onDragEnd['callCount']).toBe(1);
});


it('allows user to select a node and sets the class', () => {
    const div = document.createElement('div');
    const onSelect  = sinon.spy();
    let props = {
        selectable: true,
        data: {
            selected: true,
        },
        onSelect,
        handleSelect: () => {}
    };
    const wrapper = mount(
        <TreeNode
            {...props}
        />
    );
    let anchor = wrapper.find('a.selector');

    anchor.simulate('click');
    expect(anchor.hasClass('ad-selected-node')).toBe(true);
    expect(onSelect['callCount']).toBe(1);

});

it('allows user to set custom icons', () => {
    const div = document.createElement('div');
    let props = {
        data: {
            icon: 'pencil',
            expanded: true,
            children: [{},{}]
        }
    };
    const wrapper = mount(
        <TreeNode
            {...props}
        />
    );
    let icon = wrapper.find('.fa-pencil');
    expect(icon.length === 1).toBe(true);
});

it('allows user to set expandedIcons', () => {
    const div = document.createElement('div');
    let props = {
        data: {
            expanded: true,
            children: [{},{}]
        },
        expandedIcon: 'area-chart'
    };
    const wrapper = mount(
        <TreeNode
            {...props}
        />
    );
    let icon = wrapper.find('.fa-area-chart');
    expect(icon.length === 1).toBe(true);
});

it('allows user to set custom collapsedIcon', () => {
    const div = document.createElement('div');
    let props = {
        data: {
            expanded: false,
            children: [{},{}]
        },
        collapsedIcon: 'adjust',
    };
    const wrapper = mount(
        <TreeNode
            {...props}
        />
    );
    let icon = wrapper.find('.fa-adjust');
    expect(icon.length === 1).toBe(true);
});
it('renders two selectors when not provided selectable attribute', () => {
    const div = document.createElement('div');
    const props = {
        data: {
            children:[{}]
        }
    };
    const wrapper = mount(
        <TreeNode
            {...props}
        />
    );
    let icon = wrapper.find('.expander');
    expect(icon.length === 2).toBe(true);
});
it('renders no expander with no children', () => {
    const div = document.createElement('div');
    const wrapper = mount(
        <TreeNode
        />
    );
    let icon = wrapper.find('.expander');
    expect(icon.length === 0).toBe(true);
});