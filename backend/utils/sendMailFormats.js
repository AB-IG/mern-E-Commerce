import transporter from "./nodemailer.js";

export const welcomeEmail = async (user) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "Verify your account",
        text: `Hello ${user.name},

Your verification token is: ${user.verifyEmailToken}

This token expires in 10 minutes.`
    };

    try {
        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent:", info.messageId);

        return info;
    } catch (error) {
        console.error("EMAIL ERROR:", error);
        throw error;
    }
};
export const resetPasswordEmail = async (user) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "Reset your account",
        text: `Hello ${user.name},

Your Reset password token is: ${user.resetPasswordToken}

This token expires in 10 minutes.`
    };

    try {
        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent:", info.messageId);

        return info;
    } catch (error) {
        console.error("EMAIL ERROR:", error);
        throw error;
    }
};

