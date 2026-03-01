import React from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

function AccountPage({ user, onLogout }) {
  if (user) {
    return (
      <main className="container section-space">
        <h1>My Account</h1>
        <div className="account-card">
          <p>Name: {user.firstName}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
        </div>
      </main>
    );
  }

  return (
    <main className="container section-space">
      <h1>My Account</h1>
      <EmptyState
        title="You are not signed in"
        text="Login or sign up to access account details and order checkout."
      />
      <Link className="btn btn-primary" to="/auth?redirect=%2Faccount">
        Login / Sign Up
      </Link>
    </main>
  );
}

export default AccountPage;
