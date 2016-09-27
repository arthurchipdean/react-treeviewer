import React from 'react';
import ReactDOM from 'react-dom';
import TreeView from './../src/TreeView';
import { mount } from 'enzyme';
import sinon from 'sinon';
import _ from 'lodash';
let testData = [{id:1,text:"blah",children:[{id:3,children:[{id:5}]}]}];
let testExpandedData = [{id:1,expanded: true,children:[{id:3,expanded: true,children:[{id:5}]}]}];

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TreeView />, div);
});
it('updates dataset properly when firing check events', () => {
    let fixture = _.cloneDeep(testData);
    const div = document.createElement('div');
    const wrapper = mount(
      <TreeView
        data={fixture}
        checkable
      />,
      div
    );
    wrapper.find('input[type="checkbox"]').simulate('change',{target:{dataset:{id:1}}});
    expect(wrapper.state().data[0].checked).toBe(true);
    wrapper.find('input[type="checkbox"]').simulate('change',{target:{dataset:{id:3}}});
    expect(wrapper.state().data[0]._children[0].checked).toBe(true);
});
it('calls onCheck event handler', () => {
    let fixture = _.cloneDeep(testData);
    const div = document.createElement('div');
    const onCheck = sinon.spy();
    const wrapper = mount(
        <TreeView
            data={fixture}
            checkable
            onCheck={onCheck}
        />,
        div
    );
    wrapper.find('input[type="checkbox"]').simulate('change',{target:{dataset:{id:1}}});
    expect(onCheck['callCount']).toBe(1);
});

it('updates dataset properly when firing select events', () => {
    let fixture = _.cloneDeep(testData);
    const div = document.createElement('div');
    const onSelect = sinon.spy();
    const wrapper = mount(
        <TreeView
            data={fixture}
            selectable
            onSelect={onSelect}
        />,
        div
    );
    let selector = wrapper.find('a.selector');
    selector.simulate('click',{target:{dataset:{id:1}}});
    expect(wrapper.state().data[0].selected).toBe(true);
    expect(selector.hasClass('ad-selected-node')).toBe(true);
});

it('expands all branches on doubleclick', () => {
    let fixture = _.cloneDeep(testData);
    const div = document.createElement('div');
    const onSelect = sinon.spy();
    const wrapper = mount(
        <TreeView
            data={fixture}
            selectable
            onSelect={onSelect}
        />,
        div
    );
    let selector = wrapper.find('a.expander');
    selector.simulate('doubleclick',{target:{dataset:{id:1}}});
    expect(wrapper.state().data[0].expanded).toBe(true);
});
it('collapses all branches on doubleclick', () => {
    let fixture = _.cloneDeep(testExpandedData);
    const div = document.createElement('div');
    const wrapper = mount(
        <TreeView
            data={fixture}
            selectable
        />,
        div
    );
    let selector = wrapper.find('a.expander#1');
    selector.simulate('doubleclick',{target:{dataset:{id:1}}});
    expect(wrapper.state().data[0].expanded).toBe(false);
    expect(wrapper.state().data[0]._children).toBeDefined();
    expect(wrapper.state().data[0]._children[0].expanded).toBe(false);
});
it('calls onExpandAll on doubleclick', () => {
    let fixture = _.cloneDeep(testExpandedData);
    const div = document.createElement('div');
    const onExpandAll = sinon.spy();
    const wrapper = mount(
        <TreeView
            selectable
            data={fixture}
            onExpandAll={onExpandAll}
        />,
        div
    );
    let selector = wrapper.find('a.expander#1');
    selector.simulate('doubleclick',{target:{dataset:{id:1}}});
    expect(onExpandAll['callCount']).toBe(1);
});
it('expands the branch and updates dataset properly when clicking anchor', () => {
    let fixture = _.cloneDeep(testData);
    const div = document.createElement('div');
    const wrapper = mount(
        <TreeView
            data={fixture}
            selectable
        />,
        div
    );
    let selector = wrapper.find('a.expander');
    selector.simulate('click',{target:{dataset:{id:1}}});
    expect(wrapper.state().data[0].expanded).toBe(true);
});
it('collapses the branch and updates dataset properly when clicking anchor', () => {
    let fixture = _.cloneDeep(testExpandedData);
    const div = document.createElement('div');
    const wrapper = mount(
        <TreeView
            data={fixture}
            selectable
        />,
        div
    );
    let selector = wrapper.find('a.expander#1');
    selector.simulate('click',{target:{dataset:{id:1}}});
    expect(wrapper.state().data[0].expanded).toBe(false);
    expect(wrapper.state().data[0]._children).toBeDefined();
});
it('calls onExpand when expanding/collapsing a branch', () => {
    let fixture = _.cloneDeep(testExpandedData);
    const div = document.createElement('div');
    const onExpand = sinon.spy();
    const wrapper = mount(
        <TreeView
            data={fixture}
            selectable
            onExpand={onExpand}
        />,
        div
    );
    let selector = wrapper.find('a.expander#1');
    selector.simulate('click',{target:{dataset:{id:1}}});
    expect(onExpand['callCount']).toBe(1);
});