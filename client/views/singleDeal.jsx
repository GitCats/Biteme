var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');

var SingleDeal = React.createClass({
  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
    console.log(this.props)
  },
 
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render: function() {
  	var description = this.props.description;
    return (
      <div>
        <button onClick={this.openModal}>More Info</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
 
          <h2>Hello
          	{this.props.description}
          </h2>
          <button onClick={this.closeModal}>close</button>

        </Modal>
      </div>
    );
  }
});

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// var Mod = React.createClass({
 
//   getInitialState: function() {
//     return { modalIsOpen: false };
//   },
 
//   openModal: function() {
//     this.setState({modalIsOpen: true});
//   },
 
//   closeModal: function() {
//     this.setState({modalIsOpen: false});
//   },
 
//   render: function() {
//     return (
//       <div>
//         <button onClick={this.openModal}>More Info</button>
//         <Modal
//           isOpen={this.state.modalIsOpen}
//           onRequestClose={this.closeModal}
//           style={customStyles} >
 
//           <h2>Hello
//           	{this.props.description}
//           </h2>
//           <button onClick={this.closeModal}>close</button>
//           <div>I am a modal</div>
//           <form>
//             <input />
//             <button>tab navigation</button>
//             <button>stays</button>
//             <button>inside</button>
//             <button>the modal</button>
//           </form>
//         </Modal>
//       </div>
//     );
//   }
// });

module.exports = SingleDeal;