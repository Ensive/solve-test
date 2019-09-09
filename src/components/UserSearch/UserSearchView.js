import React from 'react';
import PropTypes from 'prop-types';
import UserContainer from '../User/UserContainer'

const UserSearchView = props => {
  return (
      <div className="UserSearch">
        <input type="text" className="UserSearch__input" onChange={props.onNameFilterChange}/>
        <input type="text" className="UserSearch__input" onChange={props.onDateBirthFilterChange}/>
      </div>
  );
};

UserSearchView.propTypes = {

};

export default UserSearchView;
