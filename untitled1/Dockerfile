FROM node:18
LABEL authors="Dubem"

WORKDIR /app

# Copy package files separately to leverage Docker layer caching
COPY package.json .
COPY package-lock.json .

# Install Node.js dependencies
RUN npm install --legacy-peer-deps

# Install Chrome and its dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && curl -LO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt-get install -y ./google-chrome-stable_current_amd64.deb \
    && rm google-chrome-stable_current_amd64.deb \
    && apt-get install -y \
    libnss3 \
    libgconf-2-4 \
    libxi6 \
    libxrender1 \
    libxtst6 \
    libxss1 \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

# Copy the rest of the application files
COPY . /app

CMD ["npm", "start"]