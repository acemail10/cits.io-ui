import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { setSearchResults } from '../../actions/setSearchResults';
import { setSecretErrorState } from '../../actions/setSecretErrorState';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      secret: ''
    }

    this.config = {
      headers: {
        authorization: 'raw'
      }
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.searchClickHandler = this.searchClickHandler.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    this.REST_URL = (process.env.NODE_ENV === 'production') ? process.env.REST_SERVER_AWS_HOST : process.env.REST_SERVER_LOCAL_HOST;
  }

  handleKeyPress(e) {
    (e.keyCode === 13) ? this.searchClickHandler() : null;
  }

  inputChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async searchClickHandler() {
    const searchData = await axios
      .get(`${this.REST_URL}/api/properties/fetch/name?name=${this.state.searchInput}`, this.config);
    
    !searchData.data.length ? 
    this.props.setSearchResults(["No Results"])
    :
    this.props.setSearchResults(searchData.data);

    document.getElementById('searchInputField').value = '';
  }

  render() {
    return (
      <div className="propertySearch">
        <hr/><br/>
        Search Property:
        <input 
          id="searchInputField"
          name="searchInput" 
          placeholder="Enter Property Name Here"
          onChange={this.inputChangeHandler}
          onKeyUp={this.handleKeyPress}
          className="signUpInnerInputs"
        />
        <button className="signUpButtons" onClick={this.searchClickHandler}>Search</button>
        <br/><br/><hr/><br/>
        {
          !this.props.searchResults.length ? null :
          this.props.userType === "0" ?
            <div>
              {
                this.props.searchResults[0] === "No Results" ? 
                <div>
                  No results, please try again.
                  <br/><hr/><br/>
                </div>
                : 
                this.props.searchResults.map(property => 
                  <div key={property.id}>
                    <div>
                      {property.name}
                    </div>
                    <div>
                      {property.address}
                    </div>

                    {
                      !this.props.propertyID ? null :
                      <div>
                        Apartment Number/Unit:
                        <input
                          name="apt_unit"
                          placeholder="Enter Unit Number"
                          onChange={this.props.inputChangeHandler}
                          className="signUpInnerInputs"
                        />
                      </div>
                    }

                    {
                      this.props.propertyID === property.id ? 
                      <button className="signUpButtons" onClick={() => { this.props.selectProperty(null)}}>Unselect Property</button>
                      :
                      <button className="signUpButtons-clear" onClick={() => { this.props.selectProperty(property.id) }}>Select Property</button>
                    }
                    <br/><br/><hr/><br/>
                  </div>
                )
              }
            </div>
          :
          this.props.userType === "1" ?
            <div>
              {
                this.props.searchResults[0] === "No Results" ? 
                <div>
                  No results, please try again.
                  <br/><hr/><br/>
                </div>
                : 
                this.props.searchResults.map(property => 
                  <div key={property.id}>
                    <div>
                      {property.name}
                    </div>
                    <div>
                      {property.address}
                    </div>
                    <div>
                      Property Secret:
                      {
                        this.props.propertyID === property.id ? null :
                        <input 
                          id="secretInputField"
                          type="password"
                          name="secret" 
                          placeholder="Enter Secret Key"
                          onChange={this.inputChangeHandler}
                          className="signUpInnerInputs"
                        />
                      }
                      { this.props.secretErrorState ? <div>INVALID SECRET KEY</div> : null }
                    </div>
                    {
                      this.props.propertyID === property.id ? 
                      <button className="signUpButtons" onClick={() => { this.props.selectProperty(null)}}>Unselect Property</button>
                      :
                      <button className="signUpButtons-clear" onClick={() => { this.props.selectProperty(property.id, this.state.secret)}}>Select Property</button>
                    }<br/><br/><hr/><br/>
                  </div>
                )
              }
            </div>
          : null
        }
        {
          this.props.userType === "1" ?
          <div>
            <h5>or Add New Property</h5>
            <form action="">
              <div className="prop-field">
                Property Name:
                <input 
                  onChange={this.props.inputChangeHandler}
                  name="propName" 
                  placeholder="Enter Property Name"
                  className="signUpInnerInputs"
                />
              </div>

              <div className="prop-field">
                Property Address:
                <input 
                  onChange={this.props.inputChangeHandler}
                  name="propAddress" 
                  placeholder="Enter Property Address"
                  className="signUpInnerInputs"
                />
              </div>


              <div className="prop-field">
                Create Secret Key:
                <div className="side-note">
                  (This will allow you to invite others to manage the property)
                </div>
                <input 
                  type="password"
                  onChange={this.props.inputChangeHandler}
                  name="propSecret" 
                  placeholder="Enter Secret Key"
                  className="signUpInnerInputs"
                />
              </div>
            </form>
          </div>
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults,
    secretErrorState: state.secretErrorState
  }
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setSearchResults
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Signup);