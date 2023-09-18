import { env } from '../../../env';

export default () => ({
  sendgridApiKey: env.mail.sendgrid.apiKey,
});
