const ClientCall = require('../models/ClientCall');
const ClientEmails = require('../models/ClientEmail');
const Client = require('../models/Client');
// Call
const createClientCallProsperccion = async (req, res) => {
    if (req.user) {
        let data = req.body;
        try {
            let clientCall = await ClientCall.create(data);
            res.status(201).json({ data: clientCall });
        } catch (error) {
            console.error(error);
            res.status(500).json({ data: undefined, message: 'Internal server error during client call creation' });
        }
    } else {
        res.status(401).json({ data: undefined, message: 'Unauthorized' });
    }
};

const getClientCallsProsperccion = async (req, res) => {
    if (req.user) {
        try {
            let id = req.params['id'];
            let clientCalls = await ClientCall.find({client : id}).populate('asesor').sort({ createdAt: -1 });
            res.status(200).json({ data: clientCalls });
        } catch (error) {
            console.error(error);
            res.status(500).json({ data: undefined, message: 'Internal server error during client calls fetching' });
        }
    } else {
        res.status(401).json({ data: undefined, message: 'Unauthorized' });
    }
};

// Emails

const createClientEmailsProsperccion = async (req, res) => {
    if (req.user) {
        let data = req.body;
        let client = await Client.findById({ _id: data.client });
        
        setEmail(client.fullname, data.affair, data.email, data.content);

        try {
            let email = await ClientEmails.create(data);
            res.status(201).json({ data: email });
        } catch (error) {
            console.error(error);
            res.status(500).json({ data: undefined, message: 'Internal server error during client call creation' });
        }
    } else {
        res.status(401).json({ data: undefined, message: 'Unauthorized' });
    }
};
 

/////////////

const setEmail = async (client,affair,email, content ) => {
    console.log(`Iniciando el envío de correo a: ${email}`);
  
    const readHTMLFile = (filePath, callback) => {
      fs.readFile(filePath, { encoding: 'utf-8' }, (err, html) => {
        if (err) {
          callback(err);
        } else {
          callback(null, html);
        }
      });
    };
  
    const transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    }));
  
    try {
      
      
  
  
      const filePath = path.join(process.cwd(), 'src', 'mails', 'mail_message.html');
      console.log(`Leyendo archivo HTML de: ${filePath}`);
  
      readHTMLFile(filePath, (err, html) => {
        if (err) {
          console.error('Error leyendo el archivo HTML:', err);
          return;
        }
  
          const rest_html = ejs.render(html, { 
              client: client,
              affair: affair,
              email: email,
              content: content
                
         });
        const template = handlebars.compile(rest_html);
        const htmlToSend = template({ op: true });
  
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: affair,
          html: htmlToSend
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error enviando el correo:', error);
          } else {
            console.log('Correo enviado:', info.response);
          }
        });
      });
    } catch (error) {
      console.error('Error en setEmail:', error.message);
    }
  };
  

module.exports = {
    createClientCallProsperccion,
    getClientCallsProsperccion,
    createClientEmailsProsperccion
};
