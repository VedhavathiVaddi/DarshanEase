import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../hooks/useAuth';
import { APP_NAME } from '../utils/constants';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    setOpen(false);
    navigate('/');
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            DE
          </span>
          {APP_NAME}
        </NavLink>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        <ul className={`nav-links${open ? ' open' : ''}`}>
          <li>
            <NavLink to="/" onClick={() => setOpen(false)} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/temples" onClick={() => setOpen(false)}>
              Temples
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink to="/my-bookings" onClick={() => setOpen(false)}>
                My bookings
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/about" onClick={() => setOpen(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setOpen(false)}>
              Contact
            </NavLink>
          </li>

          <li className="nav-actions">
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" className="nav-user" onClick={() => setOpen(false)}>
                  {user?.name?.split(' ')[0]}
                </NavLink>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button href="/login" variant="ghost" size="sm">
                  Log in
                </Button>
                <Button href="/register" variant="maroon" size="sm">
                  Sign up
                </Button>
              </>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
