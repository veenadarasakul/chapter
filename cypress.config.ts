import { execSync } from 'child_process';

import { defineConfig } from 'cypress';
import { config } from 'dotenv';
import coverage from '@cypress/code-coverage/task';

config();

export default defineConfig({
  e2e: {
    projectId: 're65q6',
    baseUrl: 'http://localhost:3000',
    retries: { runMode: 3, openMode: 3 },
    setupNodeEvents(on, config) {
      // `on` is used to hook into various events Cypress emits
      // `config` is the resolved Cypress config

      config.env = config.env || {};
      // TODO: ideally the email address should have a common source (since it's
      // used in the db generator, too)

      config.env.SERVER_URL =
        process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
      config.env.GQL_URL = `${config.env.SERVER_URL}/graphql`;

      // This makes sure the db is populated before running any tests. Without this,
      // it's difficult (when running docker-compose up) to guarantee that both the
      // docker container is running and that the db has been seeded.
      on('before:run', () => {
        execSync('npm run db:reset');
      });
      coverage(on, config);
      return config;
    },
  },
  env: {
    mailHogUrl: 'http://localhost:8025',
  },
});
