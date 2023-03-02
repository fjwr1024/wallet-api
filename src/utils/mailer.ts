import * as sgMail from '@sendgrid/mail';
import 'dotenv/config';

const API_KEY = process.env.SENDGRID_API_KEY as string;
const FROM_ADDRESS = process.env.SENDGRID_EMAIL_FROM as string;

sgMail.setApiKey(API_KEY);

export const sendMail = async (to: string, subject: string, text: string, html?: string): Promise<void> => {
  console.log('sgmail', sgMail);

  await sgMail.send({
    to,
    from: FROM_ADDRESS,
    subject,
    text,
    html,
  });
};

export const sendMailMultiple = async (to: string[], subject: string, text: string, html?: string): Promise<void> => {
  await sgMail.sendMultiple({
    to,
    from: FROM_ADDRESS,
    subject,
    text,
    html,
  });
};
