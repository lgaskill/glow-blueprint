const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

const oauth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

exports.send = async ({ subject, message, recipients }) => {
  let accessToken;
  try {
    accessToken = await oauth2Client.getAccessToken();
  } catch (err) {
    console.error("Failed to get access token", err);
    return;
  }

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "abby@theglowblueprint.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken
    },
    tls: { rejectUnauthorized: false }
  });

  const mailOptions = {
    from: "abby@theglowblueprint.com",
    to: recipients.join(", "),
    subject: subject,
    generateTextFromHTML: true,
    html: message
  };

  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(mailOptions, (error, response) => {
      smtpTransport.close();
      if (!error) {
        console.error(error);
        reject(error);
      } else {
        console.log("Email Sent");
        resolve(response);
      }
    });
  });
};
