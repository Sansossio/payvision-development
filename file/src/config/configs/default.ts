import { config } from 'dotenv';
config();

export default {
  application: {
    port: process.env.PORT || 3000,
  },
  currencyApi: {
    endpoint: 'https://api.exchangeratesapi.io/latest',
  },
};
