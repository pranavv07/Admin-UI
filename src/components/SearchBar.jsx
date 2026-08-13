const SearchBar = ({ search, handleSearch }) => {
    return (
      <>
        <div className="row searchUser">
          <input
            placeholder="Search by name, email or role"
            name={search}
            onChange={(e) => handleSearch(e.target.value)}
          ></input>
        </div>
      </>
    );
}
export default SearchBar