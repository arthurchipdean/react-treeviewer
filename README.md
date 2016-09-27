[![React Treeview]

## Installing

```
npm install --save react-treeviewer
```

##Another tree viewer?
There are already multiple solutions out the for viewing hierarchical data but I found all existing libraries to be lacking in some manner. I wanted to be able to customize more than I could with the existing solutions.

## Basic Usage
```
import TreeView from  'react-treeviewer';
render: () {
    <TreeView
        data={data}
    />


}

```
## Data format
```
[{
    id:1,
    text:"Root",
    ,children:[{
        id:3,
        text:"Child 1"
        children:[{id:5, text:"Grandchild 1"}]
        }
    ]
}]
}
```
Add properties to each data node for more fine grained control.
## Optional properties
--

#### icon
###### string
Fontawesome icon name.

--

#### expanded
###### boolean
Is the node expanded?

--

#### selected
###### boolean
Is the node selected?

--

#### checked
###### boolean
Is the node checked?


## Something Missing?

If you have ideas for more “How To” recipes that should be on this page, [let us know](https://github.com/facebookincubator/create-react-app/issues) or [contribute some!](https://github.com/facebookincubator/create-react-app/edit/master/template/README.md)
"# react-treeview-ad" 
