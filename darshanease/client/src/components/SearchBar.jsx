import { useState } from 'react';
import Button from './Button';

function SearchBar({ initialValue = '', onSearch, placeholder = 'Search by temple, deity, or city…' }) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch?.(value.trim());
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search temples"
      />
      <Button type="submit" variant="maroon" size="sm">
        Search
      </Button>
    </form>
  );
}

export default SearchBar;
