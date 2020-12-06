const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    auth: {
      user: 'kamina94@inbox.ru',
      pass: '+998915700004'
    }
  },
      {
        from: 'Indicator <kamina94@inbox.ru>',
      }
  );

  const mailer = message => {
    transporter.sendMail(message,(err,info) => {
      if(err) return console.log(err)
      console.log('Email sent: ', info)
    })
  }



module.exports = mailer;
