import React, {Component} from 'react';
import axios from 'axios';
import UserContainer from './User/UserContainer'
import PropTypes from 'prop-types';
import './User/User.scss'
import './UserSearch/UserSearch.scss';

import UserSearchContainer from './UserSearch/UserSearchContainer'

class UsersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('https://randomuser.me/api/?results=20&inc=name,registered').then(this.handleUserDataUpdate);
  }

  handleUserDataUpdate = ({data}) => {
    const {results} = data;
    this.setState({users: results})
  };

  render() {
    return (
        <div className="Container">

        <UserSearchContainer />

          {this.state.users.map((user, index) =>
            <UserContainer key={index}
                           {...user} />
          )}
        </div>
    )
  }
}

UsersContainer.propTypes = {};

export default UsersContainer;
