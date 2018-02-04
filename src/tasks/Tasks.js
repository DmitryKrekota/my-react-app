import React from 'react';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        };
    };

    edit = () => {
        this.setState({edit: true});
    };
    remove = () => {
        this.props.deleteBlock(this.props.index);
    };
    save = () => {
        this.props.update(this.refs.newTxt.value, this.props.index);
        this.setState({edit: false});
    };
    rendNorm = () => {
        return (
            <div className="box">
                <div className="text">{this.props.children}</div>
                <button onClick={this.edit} className="btn light">Edit</button>
                <button onClick={this.remove} className="btn red">Remove</button>
            </div>
        );
    };
    rendEdit = () => {
        return (
            <div className="box">
                <textarea ref="newTxt" defaultValue={this.props.children} name="" id="" cols="30" rows="10"/>
                <button onClick={this.save} className="btn success">Save</button>
            </div>
        );
    };

    render() {
        if (this.state.edit) {
            return this.rendEdit();
        } else {
            return this.rendNorm();
        }
    };
}

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    };

    add = (text) => {
        let arr = this.state.tasks;
        arr.push(text);
        this.setState({tasks: arr});
    };
    deleteBlock = (i) => {
        let arr = this.state.tasks;
        arr.splice(i, 1);
        this.setState({tasks: arr});
    };
    updateText = (text, i) => {
        let arr = this.state.tasks;
        arr[i] = text;
        this.setState({tasks: arr});
    };
    eachTask = (item, i) => {
        return (
            <Task key={i} index={i} update={this.updateText} deleteBlock={this.deleteBlock}>
                {item}
            </Task>);
    };

    render() {
        return (
            <div className="field">
                <button onClick={this.add.bind(null, 'Simple task')} className="btn new">New task</button>
                {this.state.tasks.map(this.eachTask)}
            </div>
        );
    };
}

export default Tasks;
