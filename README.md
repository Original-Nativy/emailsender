# Email Sender - Wizzscheduler

A lightweight email notification service built with TypeScript and Node.js. Sends critical alerts via Gmail to multiple recipients on a scheduled basis.

## Features

- 📧 Send emails via Gmail SMTP
- 🔄 Multiple recipient support
- ⏰ Scheduled task execution
- 🐳 Docker support
- 🔐 Environment variable configuration
- 📝 Comprehensive logging with emoji indicators

## Prerequisites

- Node.js 18+ or Docker
- Gmail account with app-specific password
- Environment variables configured

## Installation

### Local Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd emailsender
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_RECIPIENT=[recipient1@example.com, recipient2@example.com]
```

## Configuration

### Environment Variables

- `EMAIL_USER` - Gmail address used to send emails
- `EMAIL_PASS` - Gmail app-specific password (not your regular password)
- `EMAIL_RECIPIENT` - Email recipient(s) in format: `[email1@example.com, email2@example.com]`

### Gmail Setup

1. Enable 2-Step Verification on your Gmail account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the 16-character app password in `EMAIL_PASS`

## Usage

### Run Locally

```bash
npm start
```

This will execute the scheduled task and send email notifications.

### Docker

Build the Docker image:
```bash
docker build -t emailsender .
```

Run the container:
```bash
docker run --env-file .env emailsender
```

## Project Structure

```
.
├── src/
│   ├── index.ts          # Main entry point with task scheduler
│   └── email.ts          # Email sending logic
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── Dockerfile            # Docker configuration
└── README.md            # This file
```

## How It Works

1. The application initializes the scheduler
2. Runs the main task which sends a critical alert email
3. Parses the `EMAIL_RECIPIENT` environment variable to extract multiple recipients
4. Sends emails using Gmail SMTP transport
5. Includes a 2-second cooldown between operations
6. Exits after task completion

## Logs

The application provides detailed console output with emoji indicators:
- ✅ Success messages
- ❌ Error messages
- 🚀 Initialization and completion
- ⏳ Task execution status

## Error Handling

The application includes comprehensive error handling:
- Connection errors to Gmail SMTP
- Invalid email recipients
- Task execution failures
- Process exit codes (0 for success, 1 for failure)

## License

MIT

## Author

Nativy (dangiera11@gmail.com)
