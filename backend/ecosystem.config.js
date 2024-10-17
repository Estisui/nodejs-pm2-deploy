require('dotenv').config();
require('dotenv').config({ path: '.env.deploy' });

const {
  JWT_SECRET,
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [
    {
      name: 'backend',
      script: './dist/app.js',
      env_production: {
        NODE_ENV: 'production',
        JWT_SECRET,
      },
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/Estisui/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      key: 'vm-6',
      'pre-deploy': `scp .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build',
    },
  },
};
