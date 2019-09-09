import React from 'react';
import PropTypes from 'prop-types';

const UserSearchView = props => {
  return (
    <div className="UserSearch">
      {/* <label className="UserSearch__name" htmlFor="UserSearch__name"></label> */}
      <input
        id="UserSearch__name"
        placeholder="Search name..."
        type="text"
        className="UserSearch__input"
        onChange={props.onNameFilterChange}
      />
    </div>
  );
};

UserSearchView.propTypes = {};

export default UserSearchView;
