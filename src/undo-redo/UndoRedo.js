import React from 'react';
import createReactClass from 'create-react-class';
import Immutable from 'immutable';
import { _ } from 'underscore';

let colors = ['#f44336', '#00bcd4', '#3f51b5', '#009688', '#cddc39', '#ffc107', '#607d8b', '#000'];

let grid = _.map(_.range(64), (index) => {
    return {id: index, grids: _.map(_.range(64), index => {
            return {id: index, color: false};
        })}
});

let Color = createReactClass({
    render: function() {
        let divStyle = {background: this.props.type};

        if (this.props.type === this.props.selected) {
            divStyle.border = '3px solid #24d25a';
        }

        return (
            <div className="color" style={divStyle} onClick={this.props.select.bind(null, this.props.type)}>&nbsp;</div>
        );
    }
});

let Cell = createReactClass({

    shouldComponentUpdate: function(nextProps, nextState) {
        return this.props.color !== nextProps.color;
    },

    render: function() {
        let divStyle = {background: this.props.color};

        if (this.props.columnId === 0) {
            divStyle.clear = 'right';
        }

        return (
            <div style={divStyle}
                 onMouseOver={this.props.onClick.bind(null, this.props.rowId, this.props.columnId )}
                 className="grid"
                 id={this.props.columnId}>&nbsp;
            </div>
        );
    }
});

let Row = createReactClass({
    render: function() {
        let columns = this.props.row.get('grids').map((column, i) => {
            return (
                <Cell color={column.get('color')}
                      key={i}
                      onClick={this.props.onClick}
                      columnId={column.get('id')}
                      rowId={this.props.row.get('id')}/>
            );
        }).toArray();

        return (
            <div className='gridRow'>
                {columns}
            </div>
        );
    }
});

let Drawing = createReactClass({
    render: function() {
        let rows = this.props.grid.map((row, i) => {
            return (
                <Row row={row} key={i} onClick={this.props.onClick} />
            );
        }).toArray();

        return (
            <div className="draw"
                 onMouseDown={this.props.setDrawing.bind(null, true)}
                 onMouseUp={this.props.setDrawing.bind(null, false)}>
                {rows}
            </div>
        );
    }
});

let Colors = createReactClass({
    render: function() {
        let colors =  this.props.colors.map((color, i)=> {
            return <Color type={color} key={i} select={this.props.select} selected={this.props.selected}/>
        });

        return (
            <div className="colors">
                {colors}
            </div>
        );
    }
});

let History = createReactClass({
    render: function() {
        return (
            <div className="history">
                {this.props.data.map((item, i)=> {
                    return <div key={i}>Updated Grid</div>;
                })}
            </div>
        );
    }
});

let Draw = createReactClass({
    getInitialState: function() {
        return {
            colors: colors,
            color: colors[0],
            history: Immutable.List(),
            future: Immutable.List(),
            items: Immutable.fromJS(grid)
        };
    },

    setDrawing: function(isDrawing) {
        this.setState({drawing: isDrawing});

        if (this.state.future.size > 0) {
            this.setState({future: Immutable.List()});
        }

        if (! this.state.drawing) {
            this.setState({history: this.state.history.push(this.state.items)});
        }
    },

    updateColor: function(color) {
        this.setState({color: color});
    },

    onClick: function(rowId, colId) {
        if (! this.state.drawing) return;
        let newItems = this.state.items.updateIn([rowId, 'grids', colId], val => {
            return val.set('color', this.state.color);
        });

        this.setState({
            items: newItems
        });
    },


    undo: function() {
        if (this.state.history.size < 1) return;
        this.setState({
            history: this.state.history.pop(),
            future: this.state.future.push(this.state.items),
            items: this.state.history.last()
        });
    },

    redo: function() {
        if (this.state.future.size < 1) return;
        this.setState({
            items: this.state.future.last(),
            history: this.state.history.push(this.state.items),
            future: this.state.future.pop()
        });
    },

    render: function() {
        return (
            <div className="draw">
                <h4>Colors:</h4>
                <Colors colors={this.state.colors} select={this.updateColor} selected={this.state.color}/>
                <hr/>
                <Drawing onClick={this.onClick} grid={this.state.items} setDrawing={this.setDrawing}/>
                <hr/>
                <button className="btn btn-default" disabled={this.state.history.size < 1} onClick={this.undo}>Undo</button>
                <button className="btn btn-default" disabled={this.state.future.size < 1} onClick={this.redo}>Redo</button>
                <History data={this.state.history} />
            </div>
        );
    }
});

const UndoRedo = () => (
    <div>
        <Draw/>
    </div>
);

export default UndoRedo;
