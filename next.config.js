const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  // if we are in development
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env : {
        mongodb_username : 'user1897',
        mongodb_password : 'uwsSFdt6ed6LiOe9',
        mongodb_database : 'blognext'
      }
    }
  }

  // if we are not in development
  return {
    env : {
      mongodb_username : 'user1897',
      mongodb_password : 'uwsSFdt6ed6LiOe9',
      mongodb_database : 'blognext'
    }
  }
};
