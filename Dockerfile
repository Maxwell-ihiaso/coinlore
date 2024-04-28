# Stage 1: Build the application
FROM node:18-alpine as builder

WORKDIR /app/coinlore

RUN npm install pm2 -g

# Copy package.json and yarn.lock for caching dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --network-timeout 1000000

# Copy the rest of the application code
COPY . .

RUN yarn build

# Stage 2: Serve the application
FROM node:18-alpine as runner

ENV HOST 0.0.0.0

WORKDIR /app/admin

# Copy the built files from the builder stage
COPY --from=builder /app/admin ./

# Set environment variables for Next.js
ENV NEXT_PUBLIC_HOST=0.0.0.0
ENV NEXT_PUBLIC_PORT=8080

# Here we add the command to run the Next.js application with the specified URLs
# CMD ["yarn", "start", "-p", "8080"]
CMD [ "pm2-runtime", "start","ecosystem.config.js" ]


