import { config } from 'dotenv';
config();

export default {
  application: {
    port: process.env.PORT || 3000,
  },
  api: {
    endpoint: process.env.API_ENDPOINT,
    credentials: {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD,
    },
  },
  services: {
    file: {
      endpoint: process.env.FILE_SERVICE || 'http://localhost:9000',
    },
    currency: {
      endpoint: process.env.CURRENCY_SERVICE || 'http://localhost:4000',
    },
    mailer: {
      host: process.env.MAILER_HOST,
      port: +process.env.MAILER_PORT,
      ssl: process.env.MAILER_SSL === 'true',
      username: process.env.MAILER_USERNAME,
      password: process.env.MAILER_PASSWORD,
    },
  },
};
