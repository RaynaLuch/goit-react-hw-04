export const SearchBar = ({ setQuery, setImageData }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    setImageData([]);

    setQuery(e.target.elements.query.value);
  };
  return (
    <header>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          autoComplete="off"
          name="query"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
