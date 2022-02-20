const nodemailer = require("nodemailer");

exports.nodeMailer = (to, subject, html, text = "") => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mentoryab.com@gmail.com",
      pass: "Mentor1400#",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOpttions = {
    from: "mentoryab.com@gmail.com",
    to,
    subject,
    html,
    text,
  };

  transporter.sendMail(mailOpttions, function (err, sucsess) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("email sent!");
  });
};
