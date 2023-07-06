import { transporter } from "../Config/nodemail-config";

// ----------OTP Generator----------------
export const generateOTP = ()=> Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000; 

  // ----------------sending mail -----------------
export const sendMail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log('Mail sent successfully');
        resolve(data.success = 'Mail sent successfully');
      }
    });
  });
};

