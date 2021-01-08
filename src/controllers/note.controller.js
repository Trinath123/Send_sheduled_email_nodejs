var nodeMailer = require('nodemailer');
let cron = require('node-cron');

exports.sendMail = async (req, res) => {
    try {
        var transporter = nodeMailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'trinathquintus@gmail.com',
                pass: '********'
            }
        });

        var mailOptions = {
            from: 'trinathquintus@gmail.com',
            to: req.body.email,
            subject: req.body.subject,
            text: req.body.message
        };

        await cron.schedule('* * * * *', () => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
        return res.status(200).json({success: true, message: "successfully sent email"});
    } catch (e) {
        return res.status(e.status).json({error: true, message: 'email sending error'});
    }
}



