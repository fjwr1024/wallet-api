import * as sgMail from '@sendgrid/mail';

const API_KEY = process.env.SENDGRID_API_KEY as string;
sgMail.setApiKey(API_KEY);

export default sgMail;
