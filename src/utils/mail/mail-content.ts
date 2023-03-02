export const AUTH_MAIL_TITLE = `
    [WalletAPI]Check your verification code
`;

export const AUTH_MAIL_BODY = (verifyCode: string) => {
  const body = `
  Your Authorization code is ${verifyCode}. 
  Please enter the verification code to complete your membership registration.
  If you do not recognize the email, please discard the email as is. 
  This email address is for sending only. 
  I have not received a reply.
`;
  return body;
};
