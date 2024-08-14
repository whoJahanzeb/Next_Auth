import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5b3643befdf907",
        pass: "eb14560ceb191e",
      },
    });

    const mailOption = {
      from: "jahanzeb@jahanzeb.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email." : "Reset your password.",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verify-email?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser. <br>
      ${process.env.DOMAIN}/verify-email?token=${hashedToken}
      </p>`,
    };

    const mailResonse = await transport.sendMail(mailOption);
    return mailResonse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
