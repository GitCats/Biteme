var React = require('react');
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

var RestaurantCheckBox = React.createClass({
  handleChange: function(e) {
    this.props.changeBox(e.target.checked, this.props.restaurant.name);
  },

  render: function() {
    var checked = this.props.restaurant.checked;
    return (
      <p style={{display: "inline-block", margin: 30}}>
        <input type="checkbox" checked={this.props.restaurant.checked} onChange={this.handleChange} />
        {' '}
        <img src={this.props.restaurant.image_name} className="resCheckBoxPic" />
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
      <h3>Get updates for these cuisines:</h3>
      <form onSubmit={this.handleSubmit}>
        {options}
        <input type="submit" value="Save Changes" className="cuisineButton" />
      </form>
    </div>
    );
  }
});

var RestaurantForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.submitChanges();
  },

  render: function() {
    var options = [];
    this.props.data.forEach(function(row){
      options.push(<RestaurantCheckBox restaurant={row} key={row.restaurant_id} changeBox={this.props.onBoxChange} />);
    }.bind(this));

    $(".restaurantButton").hide();
    if(this.props.altered){
      $(".restaurantButton").show();
    }

    return (
      <div className="restaurantform">
        <h3>Get updates for these restaurants:</h3>
        <form onSubmit={this.handleSubmit}>
          {options}
          <input type="submit" value="Save Changes" className="restaurantButton" />
        </form>
      </div>
    );
  }
});

var PhoneForm = React.createClass({
  getInitialState: function() {
    return {number: ''};
  },

  handleNumberChange: function(e) {
    this.setState({number: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var number = this.state.number.trim();
    if(!number){
      return;
    }
    this.props.submitphone(number);
    this.setState({number: ''});
  },

  render: function() {
    return (
      <div className="phoneNumberEntry">
        <span><h4>Enter your phone number to receive text updates:</h4>
        <p>(Please include area code)</p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="+15121234567" value={this.state.number} onChange={this.handleNumberChange} />
          <input type="submit" value="Submit" />
        </form>
        </span>
      </div>
    );
  }
});

var UserProfile = React.createClass({

  loadCuisinesFromServer: function() {
    var user_id = localStorage.getItem("user_id");
    $.ajax({
      url: 'api/userprefs/cuisines',
      dataType: 'json',
      type: 'POST',
      data: {"user_id": user_id},
      success: function(data) {
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

        this.setState({cuisinePreferences: temp});
      }.bind(this),

      error: function(xhr, status, err) {
        console.error('api/userprefs/cuisines', status, err.toString());
      }.bind(this)
    });
  },

  loadRestaurants: function() {
    var token = localStorage.getItem("token");
    if (token) {
      var user_id = localStorage.getItem("user_id");
      $.ajax({
        url: 'api/userprefs/allRestaurants',
        dataType: 'json',
        cache: false,
        headers: { "x-access-token": token },

        success: function(data) {
          var restaurants = [];
          data.forEach(function(row){
            restaurants.push(row);
          }.bind(this));
          this.setState({restaurantPreferences: restaurants});
          //nested ajax call to get stored preferences
          $.ajax({
            url: 'api/userprefs/restaurants',
            dataType: 'json',
            type: 'POST',
            data: {"user_id": user_id},
            success: function(data) {
              var checkedRes = [];
              // var temp = [];
              data.forEach(function(row){
                checkedRes.push(row["name"]);
              }.bind(this));
              this.state.restaurantPreferences.forEach(function(row){
                if(checkedRes.indexOf(row.name) > -1){
                  row["checked"] = true;
                }
                else{
                  row["checked"] = false;
                }
              }.bind(this));
              this.forceUpdate();
            }.bind(this),
            error: function(xhr, status, err) {
              console.error('api/userprefs/cuisines', status, err.toString());
            }.bind(this)
          });
        }.bind(this), //first success closer

        error: function(xhr, status, err) {
          localStorage.clear();
          console.error('api/userprefs/allRestaurants', status, err.toString());
          location.reload(true);
        }.bind(this)
      });
    }
  },

  submitCuisinesChange: function(changes) {
    var user_id = localStorage.getItem("user_id");
    var changes = {"user_id": user_id, "cuisine_id": this.state.cuisineChanges};
    changes = JSON.stringify(changes);
    $.ajax({
      url: 'api/userprefs/updateCuis',
      dataType: 'json',
      type: 'POST',
      data: {"a": changes},
      success: function(data) {
        this.setState({cuisineViewAltered: false});
        this.setState({cuisineChanges: {}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/userprefs/updateCuis', status, err.toString());
      }.bind(this)
    });
  },

  submitResChange: function(changes) {
    var user_id = localStorage.getItem("user_id");
    var changes = {"user_id": user_id, "restaurant_id": this.state.restaurantChanges};
    changes = JSON.stringify(changes);
    $.ajax({
      url: 'api/userprefs/updateRes',
      dataType: 'json',
      type: 'POST',
      data: {"a": changes},
      success: function(data) {
        this.setState({resViewAltered: false});
        this.setState({restaurantChanges: {}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/userprefs/updateRes', status, err.toString());
      }.bind(this)
    });
  },

  handleBoxChange: function(yesOrNo, category) {
    var index = cuisines.map(function(obj){
      return obj.category;}).indexOf(category);
    this.state.cuisinePreferences[index].checked = yesOrNo;
    this.forceUpdate();

    this.setState({cuisineViewAltered: true});
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
    if(!existed){
      holder[id] = yesOrNo;}
    this.setState({cuisineChanges: holder});
  },

  handleResChange: function(yesOrNo, category) {
    var index = this.state.restaurantPreferences.map(function(obj){
      return obj.name;}).indexOf(category);
    this.state.restaurantPreferences[index].checked = yesOrNo;
    this.forceUpdate();

    this.setState({resViewAltered: true});
    if(yesOrNo === true){yesOrNo = 1;}else{yesOrNo=0;}

    var holder = this.state.restaurantChanges;
    var element = this.state.restaurantPreferences[index];
    var id = element.restaurant_id;
    var existed = false;
    for(var x in holder){
      if(x === id){
        holder[x] = yesOrNo;
        existed = true;
      }
    }
    if(!existed){
      holder[id] = yesOrNo;
    }
    this.setState({restaurantChanges: holder});
  },

  handlePhoneChange: function(number) {
    var id = localStorage.getItem('user_id');
    var sending = {user_id: id, phone: number};
    $.ajax({
      url: 'api/userprefs/phone',
      dataType: 'text',
      type: 'POST',
      data: sending,
      success: function(data) {
        console.log('return data from phone', data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/userprefs/phone', status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {
      cuisinePreferences: [],
      cuisineChanges: {},
      restaurantPreferences: [],
      restaurantChanges: {},
      cuisineViewAltered: false,
      resViewAltered: false
    };
  },

  componentDidMount: function() {
    this.loadCuisinesFromServer();
    this.loadRestaurants();
  },

  // onChangeSubmit={this.handleCuisinesChange}
  render: function() {
    if (localStorage.getItem("token") && localStorage.getItem("user_id")) {
      localStorage.setItem("dontShowUserLink", true);
      var user = localStorage.getItem("user");
      return (
        <div className="userprefs">
          <h2>Hello {user}</h2>
          <PhoneForm submitphone={this.handlePhoneChange}/>
          <CuisineForm data={this.state.cuisinePreferences} altered={this.state.cuisineViewAltered} onBoxChange={this.handleBoxChange} submitChanges={this.submitCuisinesChange} />
          <RestaurantForm data={this.state.restaurantPreferences} altered={this.state.resViewAltered} onBoxChange={this.handleResChange} submitChanges={this.submitResChange} />
        </div>
      );
    } else {
      return (
      <div className="userprefs">
        <h1>YOU ARE NOT LOGGED IN AS A USER</h1>
        <p className="text" >
        If {"you're"} just looking for deals, please <Link to={"/"}>visit our main page here.</Link>
        </p>
      </div>
      );
    }
  }
});

module.exports = UserProfile;
