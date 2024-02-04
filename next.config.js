const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');


module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb__username: "samlekchris",
        mongodb__password: "pyaWawGxYJKgA2Pr",
        mongodb__database: "my-blog-site",
        mongodb__clustername: "cluster0",
      },
    };
  }
  

  return {
    env: {
      mongodb__username: "samlekchris",
      mongodb__password: "pyaWawGxYJKgA2Pr",
      mongodb__database: "my-blogPost",
      mongodb__clustername: "cluster0",
    },
  };
};