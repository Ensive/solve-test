import React from 'react';
import PropTypes from 'prop-types';

const UserView = ({name, dob}) => {
  return (
    <li className="User">
      <span className="User__cell User__cell--name">{`${name.first} ${name.last}`}</span>
      <span className="User__cell">{dob}</span>
    </li>
  );
};

UserView.propTypes = {

};

export default UserView;
