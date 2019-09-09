import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UserView from './User/UserView';
import UserSearchView from './UserSearch/UserSearchView';
import './User/User.scss';
import './UserSearch/UserSearch.scss';

const DESC = 'DESC';
const ASC = 'ASC';

class UsersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFilter: '',
      // yearFilter: '',
      users: [],
      sorted: {
        field: undefined, // name
        type: undefined // ASC
      }
    };
  }

  componentDidMount() {
    axios
      .get('https://randomuser.me/api/?results=20&inc=name,dob')
      .then(this.handleUsersDataRequest)
      .catch(e => {
        this.setState({ error: 'Sorry, something went wrong' });
      });
  }

  getUsersLabelSortClass = sortedBy => {
    const isCurrentlySortedByName = this.state.sorted.field === sortedBy;
    const isSortedAsc = this.state.sorted.type === ASC;
    const isSortedDesc = this.state.sorted.type === DESC;
    return classNames('Users__sort', {
      'Users__sort Users__sort--asc': isCurrentlySortedByName && isSortedAsc,
      'Users__sort Users__sort--desc': isCurrentlySortedByName && isSortedDesc
    });
  };

  handleUsersDataRequest = ({ data }) => {
    const { results } = data;
    const users = results.map(user => {
      const dob = new Date(user.dob.date);
      const year = dob.getFullYear();
      const date = dob.getDate();
      const formattedDate = date.toString().length === 1 ? `0${date}` : date;
      const month = dob.getMonth() + 1;
      const formattedMonth =
        month.toString().length === 1 ? `0${month}` : month;
      const convertedDob = `${formattedDate}.${formattedMonth}.${year}`;
      return {
        ...user,
        dob: convertedDob,
        timestamp: new Date(user.dob.date).getTime()
      };
    });

    this.setState({ users });
  };

  handleNameFilterChange = e => {
    this.setState({ nameFilter: e.target.value });
  };

  handleSortByName = () => {
    const { users, sorted } = this.state;
    const isSortedDesc = sorted.type === DESC;
    let usersSorted = users;

    if (!sorted.type || isSortedDesc) {
      usersSorted = users.sort((user, nextUser) =>
        user.name.first > nextUser.name.first ? 1 : -1
      );
      this.setState({
        sorted: {
          type: ASC,
          field: 'name'
        }
      });
    } else {
      usersSorted = users.sort((user, nextUser) =>
        user.name.first > nextUser.name.first ? -1 : 1
      );
      this.setState({
        sorted: {
          type: DESC,
          field: 'name'
        }
      });
    }

    this.setState({ users: usersSorted });
  };

  handleSortByBirthday = e => {
    const { users, sorted } = this.state;
    const isSortedDesc = sorted.type === DESC;
    let usersSorted = users;

    if (!sorted.type || isSortedDesc) {
      usersSorted = users.sort((user, nextUser) =>
        user.timestamp > nextUser.timestamp ? 1 : -1
      );
      this.setState({
        sorted: {
          field: 'birthday',
          type: ASC
        }
      });
    } else {
      usersSorted = users.sort((user, nextUser) =>
        user.timestamp > nextUser.timestamp ? -1 : 1
      );
      this.setState({
        sorted: {
          field: 'birthday',
          type: DESC
        }
      });
    }

    this.setState({ users: usersSorted });
  };

  renderError() {
    return (
      <div className="Container">
        <p className="Error">{this.state.error}</p>
      </div>
    );
  }

  renderNoneUsersFound() {
    return <p className="Message">No users found</p>;
  }

  render() {
    if (this.state.error) {
      return this.renderError();
    }

    const users = this.state.users
      .filter(({ name }) => {
        const fullName = `${name.first} ${name.last}`;
        return fullName
          .toLowerCase()
          .includes(this.state.nameFilter.toLowerCase());
      })
      .map((user, index) => <UserView key={index} {...user} />);

    return (
      <div className="Container">
        <UserSearchView onNameFilterChange={this.handleNameFilterChange} />
        <section className="Users">
          <header className="Users__header">
            <div className="User__cell">
              <span
                onClick={this.handleSortByName}
                role="button"
                className={this.getUsersLabelSortClass('name')}
              >
                Name
              </span>
            </div>
            <div className="User__cell">
              <span
                onClick={this.handleSortByBirthday}
                role="button"
                className={this.getUsersLabelSortClass('birthday')}
              >
                Date of birth
              </span>
            </div>
          </header>
          <ul className="Users">
            {users && users.length > 0 ? users : this.renderNoneUsersFound()}
          </ul>
        </section>
      </div>
    );
  }
}

UsersContainer.propTypes = {};

export default UsersContainer;
