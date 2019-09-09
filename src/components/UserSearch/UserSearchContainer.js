import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserSearchView from "../UserSearch/UserSearchView";

class UserSearchContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      nameFilter: '',
      dateBirthFilter: ''
    }
  }

  handleNameFilterChange = (e) => {
    this.setState({ name: e.target.value })
  };


  render() {
    return (
      <UserSearchView onNameFilterChange={this.handleNameFilterChange}/>
    );
  }
}

UserSearchContainer.propTypes = {};

export default UserSearchContainer;
