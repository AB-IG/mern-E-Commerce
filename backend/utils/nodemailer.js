import "dotenv/config";
import nodemailer from "nodemailer"

console.log("SMTP USER:", process.env.SMTP_USER);
console.log(
    "SMTP PASSWORD EXISTS:",
    !!process.env.SMTP_PASSWORD
);

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
     secure: false,
    auth:{
        user:process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
})
export default transporter
