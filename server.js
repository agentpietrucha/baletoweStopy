const express = require('express')
const nodemailer = require('nodemailer');
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

var upload = multer({ storage: storage });

let mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'agentpietrucha@gmail.com',
    pass: 'cwivottbvmjmfvzk'
  }
});
function getOptions(content, attachments){
  images = []
  for(let i = 0; i < attachments.length; i++){
    console.log('ORIGINAL NAME: ', attachments[i])
    let extension = attachments[i].originalname.split('.').pop();
    images.push({
      filename: attachments[i].filename,
      content: fs.createReadStream(`/Users/sawicki/sawart/baletowystopy/uploads/${attachments[i].filename}`)
    })
  }
  let html = `
    <p>Imię i nazwisko: ${content.clientData.name}</p>
    <p>Wiek: ${content.clientData.age}</p>
    <p>Numer telefonu: ${content.clientData.telephone}</p>
    <p>Email: ${content.clientData.email}</p>
    <br><br>

    <p>Długość lewa: ${content.footHeight.left}</p>
    <p>Długość prawa: ${content.footHeight.right}</p>

    <p>Szerokość lewa: ${content.footWidth.left}</p>
    <p>Szerokość prawa: ${content.footWidth.right}</p>

    <p>Obwód prawy: ${content.footPerim.left}</p>
    <p>Obwód lewy: ${content.footPerim.right}</p>

    <p>Producent: ${content.producer}</p>
  `;
  let mailOptions = {
   from: 'agentpietrucha@gmail.com',
   // to: 'sklep@sklepbaletowy.pl',
   to: 'agentpietrucha@gmail.com',
   subject: `Formularz stóp ${content.clientData.name} ${content.clientData.email}`,
   html: html,
   attachments: images
}
  return mailOptions
}


const app = express()

app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 10000 }))
app.use(upload.any())

app.get('/', (req, res, next) => {
  console.log('sending index.html...')
  res.sendFile('/Users/sawicki/sawart/baletowystopy/index.html')
})
app.get('/:filename', (req, res, next) => {
  res.sendFile(`/Users/sawicki/sawart/baletowystopy/${req.params.filename}`)
})
app.get('/resources/:filename', (req, res, next) => {
  res.sendFile(`/Users/sawicki/sawart/baletowystopy/resources/${req.params.filename}`)
})

app.post('/upload', (req, res) => {
  console.log('post: /upload...')
  console.log(req.body)
  console.log(JSON.parse(req.body.data))
  let data = JSON.parse(req.body.data)
  let files = req.files
  console.log(req.files)
  res
    .status(200)
    .contentType('text/plain')
    .end(JSON.stringify({message: 'file uploaded'}))

  mail.sendMail(getOptions(data, files), function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  });

})

app.listen(8080, '192.168.1.76', (req, res) => {
  console.log('server running on 192.168.1.76:8080')
})