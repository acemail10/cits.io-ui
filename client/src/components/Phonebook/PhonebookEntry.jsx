import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setPhonebookEditState } from '../../actions/setPhonebookEditState';
import { setCurrentPhonebookEntry } from '../../actions/setCurrentPhonebookEntry';

class PhonebookEntry extends Component {
  constructor(props) {
    super(props);
  }

  async onEditHandler() {
    await this.props.setCurrentPhonebookEntry(this.props.data); // must be above otherwise entry will render previous selection
    await this.props.setPhonebookEditState('2'); // on submit edit form, revert to false
  }

  render() {
    return (
      <div className='phonebookInnerEntry'>
        <hr/>
        <div>
          <div className='phonebookEntryRowCompany'>
            {this.props.data.company} <br/>
            <div className='phonebookEntryRowService'>
              Service: {this.props.data.service} <br/>
            </div>
          </div>
          {localStorage.getItem('type') === '1' ? 
            <button className='phonebookEditButtons' onClick={this.onEditHandler.bind(this)}>Edit</button> 
            : 
            null
          }
          <div className='phonebookEntryRowNumber'>
            : ({this.props.data.contactinfo.slice(0, 3)}) {this.props.data.contactinfo.slice(3, 6)}-{this.props.data.contactinfo.slice(6, 10)} <br/>
          </div>
          <div className='phonebookCallIcon'/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    phonebookEditState:state.phonebookEditState
  }
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    setPhonebookEditState:setPhonebookEditState,
    setCurrentPhonebookEntry:setCurrentPhonebookEntry
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(PhonebookEntry);
