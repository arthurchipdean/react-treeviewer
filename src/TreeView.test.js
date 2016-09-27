import React from 'react';
import ReactDOM from 'react-dom';
import TreeView from './TreeView';
import { mount } from 'enzyme';
import sinon from 'sinon';
import _ from 'lodash';
let testData = [{id:1,children:[{id:3,children:[{id:5}]}]}];

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TreeView />, div);
});
it('Checkboxes work properly', () => {
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
    wrapper.find('input[type="checkbox"]').simulate('change', {target:{dataset:{id:1}}});
    expect(wrapper.state()).toBe(true);
    //expect(wrapper.find('input[type="checkbox"]').length).toBe(true);
});