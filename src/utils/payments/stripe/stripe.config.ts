import { env } from '../../../env';
export default () => ({
  stripe: {
    apiKey: env.payments.stripe.secretKey,
  },
});
