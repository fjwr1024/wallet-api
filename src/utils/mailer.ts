import sgMail from './sendGrid';

const FROM_ADDRESS = process.env.SENDGRID_EMAIL_FROM as string;

export const sendMail = async (to: string, subject: string, text: string, html?: string): Promise<void> => {
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
