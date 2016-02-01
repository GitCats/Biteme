var React = require('react');

// Generic Countdown Timer UI component
//
// https://github.com/uken/react-countdown-timer
//
// props:
//   - initialTimeRemaining: Number
//       The time remaining for the countdown (in ms).
//
//   - interval: Number (optional -- default: 1000ms)
//       The time between timer ticks (in ms).
//
//   - formatFunc(timeRemaining): Function (optional)
//       A function that formats the timeRemaining.
//
//   - tickCallback(timeRemaining): Function (optional)
//       A function to call each tick.
//
//   - completeCallback(): Function (optional)
//       A function to call when the countdown completes.
//
var CountdownTimer = React.createClass({
  displayName: 'CountdownTimer',

  propTypes: {
    interval: React.PropTypes.number,
    formatFunc: React.PropTypes.func,
    tickCallback: React.PropTypes.func,
    completeCallback: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      interval: 1000,
      formatFunc: null,
      tickCallback: null,
      completeCallback: null
    };
  },

  getInitialState: function() {
    // Normally an anti-pattern to use this.props in getInitialState,
    // but these are all initializations (not an anti-pattern).

    var expHour;
    var expMin;
    if(this.props.expiration.toString().length === 4) {
      expHour = this.props.expiration.toString().substr(0, 2)
      expMin = this.props.expiration.toString().slice(-2)
    }
    if(this.props.expiration.toString().length === 3) {
      expHour = parseInt(this.props.expiration.toString().substr(0, 1))
      expMin = parseInt(this.props.expiration.toString().slice(-2))
    }
    console.log('expiration', this.props.expiration)
    //milliseconds of when deal will expire
    var date = +new Date(this.props.year, this.props.month-1, this.props.day, expHour, expMin, 59)
    console.log('date', date)
    var todayinMS = Date.now()
    console.log('todayinms', todayinMS)
    var timeLeft = date - todayinMS;
    console.log('timeleft', timeLeft)
    return {
      timeRemaining: timeLeft,
      timeoutId: null,
      prevTime: null
    };
  },

  componentDidMount: function() {
    this.tick();
  },

  componentWillReceiveProps: function(newProps) {
    if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
    this.setState({prevTime: null, timeRemaining: newProps.initialTimeRemaining});
  },

  componentDidUpdate: function() {
    if ((!this.state.prevTime) && this.state.timeRemaining > 0 && this.isMounted()) {
      this.tick();
    }
  },

  componentWillUnmount: function() {
    clearTimeout(this.state.timeoutId);
  },

  tick: function() {
    var currentTime = Date.now();
    var dt = this.state.prevTime ? (currentTime - this.state.prevTime) : 0;
    var interval = 1000;

    // correct for small variations in actual timeout time
    var timeRemainingInInterval = (interval - (dt % interval));
    var timeout = timeRemainingInInterval;

    if (timeRemainingInInterval < (interval / 2.0)) {
      timeout += interval;
    }

    var timeRemaining = Math.max(this.state.timeRemaining - dt, 0);
    var countdownComplete = (this.state.prevTime && timeRemaining <= 0);

    if (this.isMounted()) {
      if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
      this.setState({
        timeoutId: countdownComplete ? null : setTimeout(this.tick, timeout),
        prevTime: currentTime,
        timeRemaining: timeRemaining
      });
    }

    if (countdownComplete) {
      if (this.props.completeCallback) { this.props.completeCallback(); }
      return;
    }

    if (this.props.tickCallback) {
      this.props.tickCallback(timeRemaining);
    }
  },

  getFormattedTime: function(milliseconds) {
    if (this.props.formatFunc) {
      return this.props.formatFunc(milliseconds);
    }
    console.log('ms', milliseconds)
    var totalSeconds = Math.round(milliseconds / 1000);

    var seconds = parseInt(totalSeconds % 60, 10);
    var minutes = parseInt(totalSeconds / 60, 10) % 60;
    var hours = parseInt(totalSeconds / 3600);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;
    console.log('seconds', seconds)
    console.log('minutes', minutes)
    console.log('hours', hours)
    return hours + ':' + minutes + ':' + seconds;
  },

  render: function() {
    var timeRemaining = this.state.timeRemaining;
    	return (
      		<div className='timer'>
        		{this.getFormattedTime(timeRemaining)}
      		</div>
    	);
  }	
});

module.exports = CountdownTimer; 