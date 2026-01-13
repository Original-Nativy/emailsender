import { sendEmail } from "./email";
import * as dotenv from 'dotenv';
dotenv.config();

console.log("🚀 Scheduler initialized...");

interface ApiResponse {
    xsrfToken: string;
    laravelSession: string;
    awsAlbApp0: string;
}

function formatDate(date: Date) {
    return date.toISOString().split("T")[0];
}

const mainTask = async () => {
    console.log("⏳ Running scheduled task...");

    try {
        const dateToSend = formatDate(new Date()) || 'N/A';
        await sendEmail(dateToSend);
    }
    catch (error) {
        console.error("❌ Error in task execution:", error);
    }
};

// RUN THE TASK
mainTask().then(() => {
    console.log("✅ Task completed");
    console.log("🚀 Scheduler finished");
    process.exit(0);
}).catch((error) => {
    console.error("❌ Error in task execution:", error);
    process.exit(1);
});