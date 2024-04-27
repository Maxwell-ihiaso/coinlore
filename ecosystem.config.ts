// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'next-app',
      script: 'yarn',
      args: 'start',
      cwd: __dirname,
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
