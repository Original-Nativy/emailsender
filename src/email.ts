import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendEmail(dateToSend: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const emailPromises = async () => {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECIPIENT,
            subject: "Crittical Alert: Shitlogger",
            text: `This is a critical alert from Shitlogger. Please check the system immediately. Date: ${dateToSend || 'N/A'}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log("✅ Email sent successfully to:", process.env.EMAIL_RECIPIENT);
        } catch (error) {
            console.error("❌ Error sending email to:", process.env.EMAIL_RECIPIENT, error);
        }
        // cooldown 2 seconds 
        await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    await emailPromises(); 
}