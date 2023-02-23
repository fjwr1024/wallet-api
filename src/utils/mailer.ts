import MailService from './sendGrid';

const FROM_ADDRESS = process.env.SENDGRID_EMAIL_FROM as string;

export const sendMail = async (to: string, subject: string, text: string, html?: string): Promise<void> => {
  await MailService.send({
    to,
    from: FROM_ADDRESS,
    subject,
    text,
    html,
  });
};

export const sendMailMultiple = async (to: string[], subject: string, text: string, html?: string): Promise<void> => {
  await MailService.sendMultiple({
    to,
    from: FROM_ADDRESS,
    subject,
    text,
    html,
  });
};
