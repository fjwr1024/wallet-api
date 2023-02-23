import MailService from '@sendgrid/mail';

const API_KEY = process.env.SENDGRID_API_KEY as string;
MailService.setApiKey(API_KEY);

export default MailService;
