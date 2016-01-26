var $ = require('jquery');
var Link = require('react-router').Link;
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var cuisines = [
  {category: 'mexican', checked: false, id: 1},
  {category: 'fast food', checked: false, id: 2},
  {category: 'pizza', checked: false, id: 3},
  {category: 'sandwiches', checked: false, id: 4},
  {category: 'burgers', checked: false, id: 5},
  {category: 'american', checked: false, id: 6},
  {category: 'bbq', checked: false, id: 7},
  {category: 'diner', checked: false, id: 8},
  {category: 'chinese', checked: false, id: 9},
  {category: 'italian', checked: false, id: 10},
  {category: 'japanese', checked: false, id: 11},
  {category: 'vietnamese', checked: false, id: 12},
  {category: 'thai', checked: false, id: 13},
  {category: 'steakhouse', checked: false, id: 14},
  {category: 'indian', checked: false, id: 15},
  {category: 'other', checked: false, id: 16}
]

var CuisineCheckBox = React.createClass({
  handleChange: function(e) {
    this.props.calledWhatever(
      e.target.checked, this.props.cuisine.category);
  },

  render: function() {
    var checked = this.props.cuisine.checked
    return (
      <p>
        <input type="checkbox" checked={this.props.cuisine.checked} onChange={this.handleChange}/>
          {' '}
          {this.props.cuisine.category}
      </p>
    );
  }
});

var CuisineForm = React.createClass({
  render: function(){
    var checkedCuisines = [];
    var options = [];
    //next bit takes the array of objects from the db, which are the included prefs, and puts them in an array

    this.props.data.forEach(function(row){
      options.push(<CuisineCheckBox cuisine={row} key={row.category} calledWhatever={this.props.onBoxChange}/>);
    }.bind(this));

    return (
    <div className="cuisineform">
      <h3>Cuisines</h3>
      <form>
        {options}
      </form>
    </div>
    );
  }
});

var UserProfile = React.createClass({

  loadCuisinesFromServer: function() {
    var user_id = localStorage.getItem("user_id");
    console.log('user_id', user_id);
    $.ajax({
      url: 'api/userprefs/cuisines',
      dataType: 'json',
      type: 'POST',
      data: {"user_id": user_id},
      success: function(data) {
        console.log('cuisines data', data);
        var checkedCuisines = [];
        var temp = [];
        data.forEach(function(row){
          checkedCuisines.push(row["cuisine_type"]);
        }.bind(this));

        cuisines.forEach(function(row){
        if(checkedCuisines.indexOf(row.category) > -1){
          row.checked = true;
          }
          temp.push(row);
        }.bind(this));

        console.log('temp', temp);
        this.setState({cuisinePreferences: temp});
      }.bind(this),

      error: function(xhr, status, err) {
        console.error('api/userprefs/cuisines', status, err.toString());
      }.bind(this)
    });
  },

  // handleCuisinesChange: function(changes) {
  //   var user_id = localStorage.getItem()
  //   $.ajax({
  //     url: 'api/userprefs/updateCuis',
  //     dataType: 'json',
  //     type: 'POST',
  //     data: {"user_id": user_id, "cuisine_id": {changes}}
  //   })
  // },

  handleBoxChange: function(yesOrNo, category) {
    var index = cuisines.map(function(obj){
      return obj.category;}).indexOf(category);
    this.state.cuisinePreferences[index].checked = yesOrNo;
    this.forceUpdate();
    console.log('the state has changed', this.state.cuisinePreferences);
  },

  getInitialState: function() {
    return {
      cuisinePreferences: cuisines,
      viewAltered: false
    };
  },

  componentDidMount: function() {
    this.loadCuisinesFromServer();
  },

  // onChangeSubmit={this.handleCuisinesChange}
  render: function() {
    return (
      <div className="userprefs">
        <h2>Hello sir</h2>
        <CuisineForm data={this.state.cuisinePreferences} altered={this.state.viewAltered} onBoxChange={this.handleBoxChange} />
      </div>
    );
  }
});

module.exports = UserProfile;
