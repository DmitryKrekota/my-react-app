import React from 'react';
import createReactClass from 'create-react-class';

let colors = ['#f44336', '#00bcd4', '#3f51b5', '#009688', '#cddc39', '#ffc107', '#607d8b', '#000'];

let Color = createReactClass({
    render: function() {
        let divStyle = {background: this.props.type};

        if (this.props.type === this.props.selected) {
            divStyle.border = '2px solid #ccc';
        }

        return (
            <div className="color" style={divStyle} onClick={this.props.select.bind(null, this.props.type)}>&nbsp;</div>
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


let Draw = createReactClass({
    getInitialState: function() {
        return {
            colors: colors,
            color: colors[0]
        };
    },

    updateColor: function(color) {
        this.setState({'color': color});
    },

    render: function() {
        return (
            <div>
                <Colors colors={this.state.colors} select={this.updateColor} selected={this.state.color}/>
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
