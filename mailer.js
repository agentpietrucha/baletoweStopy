var nodemailer = require('nodemailer');
const fs = require('fs')

var mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'agentpietrucha@gmail.com',
    pass: 'cwivottbvmjmfvzk'
  }
});

var mailOptions = {
   from: 'agentpietrucha@gmail.com',
   to: 'agentpietrucha@gmail.com',
   subject: 'Sending Email using Node.js',
   html: '<h1>halko</h1>',
   attachments: [{
    filename: 'bottle.jpg',
    content: fs.createReadStream('/Users/sawicki/sawart/baletowystopy/uploads/bottle.jpg')
   }]
}

mail.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
});