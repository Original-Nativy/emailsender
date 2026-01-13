# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock into the container
COPY package.json yarn.lock ./
RUN apk add --no-cache libc6-compat curl
# Install dependencies
RUN yarn install --frozen-lockfile

# Install ts-node and typescript globally for running TypeScript directly
RUN yarn global add ts-node typescript

# Copy the rest of the application code into the container
COPY . .

# Run the application using ts-node (since it's a TypeScript file)
CMD ["ts-node", "src/index.ts"]