import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //TODO: configure mail for usage

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 465,
      secure: true,
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOption = {
      from: "jahanzeb@jahanzeb.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email." : "Reset your password.",
      html: "<b>Hello world?</b>",
    };

    const mailResonse = await transporter.sendMail(mailOption);
    return mailResonse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
