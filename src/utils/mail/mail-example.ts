import { sendMail } from './mailer';

const ADMIN_EMAIL = process.env.SENDGRID_EMAIL_FROM as string;

export async function sendMailToAdminTransferPayment(): Promise<void> {
  const mailTitle = 'example mail';
  const mailBody = 'example body';
  await sendMail(ADMIN_EMAIL, mailTitle, mailBody);
}
