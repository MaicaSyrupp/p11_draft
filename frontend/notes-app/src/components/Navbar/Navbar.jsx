import React, { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();  // Hook to get the current location

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  // Debugging to check the current pathname
  console.log("Current pathname:", location.pathname);

  // Check if the current path is '/login' or '/signUp'
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signUp';

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Pen</h2>

      {/* Conditionally render SearchBar only if not on login/signup page */}
      {!isAuthPage && (
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
