import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserView from './UserView'

class UserContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  render() {
    console.log(this.props)
    return (
      <UserView {...this.props}/>
    );
  }
}

UserContainer.propTypes = {};

export default UserContainer;
