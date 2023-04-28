import { Outlet, NavLink } from 'react-router-dom';
import css from './SharedLayout.module.css';
import styled from 'styled-components';
import { Suspense } from 'react';

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 26px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  &.active {
    color: yellow;
  }
`;

export const SharedLayout = () => {
  return (
    <div className={css.headerContainer}>
      <nav>
        <StyledNavLink to="/" end>
          Home
        </StyledNavLink>
        <StyledNavLink to="/movies">Movies</StyledNavLink>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
