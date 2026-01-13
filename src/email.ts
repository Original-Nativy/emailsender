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
        // Parse recipients from env (handles bracket format: [email1, email2])
        const recipientString = process.env.EMAIL_RECIPIENT || "";
        const recipients = recipientString
            .replace(/[\[\]]/g, "") // Remove brackets
            .split(",")
            .map((email) => email.trim())
            .filter((email) => email.length > 0);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipients,
            subject: "Crittical Alert: Shitlogger",
            text: `This is a critical alert from Shitlogger. Please check the system immediately. Date: ${dateToSend || 'N/A'}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log("✅ Email sent successfully to:", recipients.join(", "));
        } catch (error) {
            console.error("❌ Error sending email to:", recipients.join(", "), error);
        }
        // cooldown 2 seconds 
        await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    await emailPromises(); 
}