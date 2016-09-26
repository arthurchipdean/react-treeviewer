import React from 'react';
import ReactDOM from 'react-dom';
import TreeNode from './TreeNode';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TreeNode />, div);
});
it('renders a tree', () => {

});