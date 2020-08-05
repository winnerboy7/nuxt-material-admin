import { Role } from '@/_services/Role';

export default function ({ store, redirect }) {
  if (!(store.state.account.status.loggedIn && store.state.account.user.role === Role.Area)) {
    redirect('/login');
  }    
};