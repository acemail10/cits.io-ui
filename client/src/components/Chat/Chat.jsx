import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Members from './Members';
import Messages from './Messages';
import io from 'socket.io-client/dist/socket.io.js';

class Chat extends Component {
  constructor(props) {
    super(props)
    this.changeHistory = this.changeHistory.bind(this);
  }

  changeHistory() {
    this.props.history.push('/userProfile');
  }

  render() {
    return (
      <div className="chatContainer">
        <Members />
        <Messages changeHistory={this.changeHistory}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    //
  }
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    //
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Chat);