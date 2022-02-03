import React from 'react';

const Search = ({ search, searchValue, setSearchValue }) => {
  return (
    <form onClick={search}><input
      label="🔎 Search"
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)}
      type="search"
    />
    <button type="submit">Search</button></form>
    

  );
};

export default Search;
