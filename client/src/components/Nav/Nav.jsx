import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { setUserData } from '../../actions/setUserData';
import { setPropertyData } from '../../actions/setPropertyData';
import { setCurrentProperty } from '../../actions/setCurrentProperty';

class Nav extends Component {
  constructor(props) {
    super(props);
    
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  // use conditionals to render different navs
  // change chat to instead push the name of the users property that they belong to

  logoutHandler() {
    this.props.setPropertyData(null);
    this.props.setCurrentProperty(null);
    this.props.setUserData(null);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        { this.props.userData ? 
          // LOGGED IN
          <div>
            <button onClick={() => this.props.history.push('/')}>Go to Home</button>
            <button onClick={() => this.props.history.push('/profile')}>Go to Profile</button>
            <button onClick={() => this.props.history.push('/phonebook')}>Go to Phonebook</button>
            <button onClick={() => this.props.history.push('/chat')}>Go to Chat</button>
            <button onClick={() => this.props.history.push('/viewArticles')}>Go to Hell</button>
            <button onClick={this.logoutHandler}>LOGOUT</button>
          </div> 
          : 
          // LOGGED OUT
          <div>
            <button onClick={() => this.props.history.push('/')}>Go to Home</button>
            <button onClick={() => this.props.history.push('/login')}>Go to Login</button>
            <button onClick={() => this.props.history.push('/signup')}>Go to Signup</button>
          </div>
        }  
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  }
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setUserData: setUserData,
    setPropertyData: setPropertyData,
    setCurrentProperty: setCurrentProperty
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Nav);