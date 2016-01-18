var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');

var GroceryList = React.createClass({
  handleClick: function(i) {
    console.log('You clicked: ' + this.props.items[i]);
  },

  render: function() {
    return (
      <div>
        {this.props.items.map(function(item, i) {
          return (
            <div onClick={this.handleClick.bind(this, i)} key={i}>{item}</div>
          );
        }, this)}
      </div>
    );
  }
});

ReactDOM.render(
  <GroceryList items={['Apple', 'Banana', 'Cranberry']} />, document.getElementById('app')
);

module.exports = GroceryList;