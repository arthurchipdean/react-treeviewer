import React from 'react';
import ReactDOM from 'react-dom';
import TreeView from './TreeView';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TreeView />, div);
});
it('renders a tree', () => {

});