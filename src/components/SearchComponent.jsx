import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setSearch } from '../store/actions/city';

const SearchComponent = ({ saveSearchValue }) => {
  const [ search, setSearch ] = useState('');

  const onSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  const onButtonPress = () => {
    saveSearchValue(search);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter City"
        onChange={onSearchChange}
        value={search}
      />
      <button onClick={onButtonPress}>Search</button>
    </div>
  );
};

SearchComponent.propTypes = {
  saveSearchValue: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  saveSearchValue: search => dispatch(setSearch(search)),
});

export default connect(null, mapDispatchToProps)(SearchComponent);

