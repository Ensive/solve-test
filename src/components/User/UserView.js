import React from 'react';
import PropTypes from 'prop-types';

const UserView = ({name, registered}) => {
  return (
    <div className="User">
      {/*<span>{name.first}</span>*/}
      {/*<span>{registered.age}</span>*/}
      <p className="User__cell">{`${name.first} ${name.last}`}</p>
      <p className="User__cell">{registered.date}</p>
    </div>
  );
};

UserView.propTypes = {

};

export default UserView;
