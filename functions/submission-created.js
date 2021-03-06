require('dotenv').config();

const nodemailer = require('nodemailer');

exports.handler = function(event, context, callback) {
  const { お問い合わせ内容, 返信先メールアドレス } = JSON.parse(event.body).payload.data;

  // OAuth認証情報
  const auth = {
    type         : 'OAuth2',
    user         : process.env.MAIL_LOGIN,
    clientId     : process.env.CLIENT_ID,
    clientSecret : process.env.CLIENT_SECRET,
    refreshToken : process.env.REFRESH_TOKEN
  };


  // トランスポート
  const transport = {
    service : 'gmail',
    auth    : auth
  };

  let transporter = nodemailer.createTransport(transport);

  const url = 'https://www.kikuzukikai.org/';

  let mailOptions = {
    from    : `"駆逐艦菊月会"<contact@kikuzukikai.org>`,
    to      : `${返信先メールアドレス}`,
    subject : '【駆逐艦菊月会】お問い合わせありがとうございます',
    text    : `お問い合わせありがとうございます。\n以下の内容でフォームを送信いたしました。\n一週間以内に追って担当者よりメールにて回答をお送りいたします。\n今しばらくお待ちください。\n\n-- 送信内容 --\nお問い合わせ内容: \n${お問い合わせ内容}\n\n返信先メールアドレス: \n${返信先メールアドレス}\n\n-- \n駆逐艦菊月会\n${url}\n`,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      callback(error);
    } else {
      callback(null, {
        statusCode: 200,
        body: 'ok',
      });
    }
  });
};
