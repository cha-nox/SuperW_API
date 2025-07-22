# Getting latest Node official alpine image
FROM node:alpine

# Defining the working directory
WORKDIR /src

# Copying the application itself into the container
COPY . .

# Opening the port required by the application
EXPOSE 5000

# Application's health check
HEALTHCHECK --interval=1m --timeout=3s --retries=3 \
    CMD curl -f http://127.0.0.1:2012/ || exit 1

# Defining the running command
CMD ["npm", "run", "start"]