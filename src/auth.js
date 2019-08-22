export const isAuthenticated = user => !!user;

export const hasRole = (user, roles) =>
  roles.some(role => user.roles.includes(role));