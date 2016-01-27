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
    this.props.changeBox(
      e.target.checked, this.props.cuisine.category);
  },

  render: function() {
    var checked = this.props.cuisine.checked
    return (
      <p style={{display: "inline-block", margin: 30}}>
        <input type="checkbox" checked={this.props.cuisine.checked} onChange={this.handleChange}/>
          {' '}
          {this.props.cuisine.category}
      </p>
    );
  }
});

var CuisineForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.submitChanges();
  },

  render: function(){
    var checkedCuisines = [];
    var options = [];
    //next bit takes the array of objects from the db, which are the included prefs, and puts them in an array

    this.props.data.forEach(function(row){
      options.push(<CuisineCheckBox cuisine={row} key={row.category} changeBox={this.props.onBoxChange}/>);
    }.bind(this));
    $(".cuisineButton").hide();
    if(this.props.altered){
      $(".cuisineButton").show();
    }

    return (
    <div className="cuisineform">
      <h3>Choose which cuisines to receive updates for</h3>
      <form onSubmit={this.handleSubmit}>
        {options}
        <input type="submit" value="Save Changes" className="cuisineButton" />
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

  // submitCuisinesChange: function(changes) {
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

    this.setState({viewAltered: true});
    console.log('yesOrNobefore', yesOrNo);
    if(yesOrNo === true){yesOrNo=1;}else{yesOrNo=0;}

    var holder = this.state.cuisineChanges;
    var existed = false;
    var id = index+1;
    for(var z in holder){
      if(z === id){
        holder[z] = yesOrNo;
        existed = true;
      }
    }
    if(!existed){holder[id] = yesOrNo;}
    this.setState({cuisineChanges: holder});
  },

  getInitialState: function() {
    return {
      cuisinePreferences: [],
      cuisineChanges: {},
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
        <CuisineForm data={this.state.cuisinePreferences} altered={this.state.viewAltered} onBoxChange={this.handleBoxChange} submitChanges={this.submitCuisinesChange} />
      </div>
    );
  }
});

module.exports = UserProfile;
