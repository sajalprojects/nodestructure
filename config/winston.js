var appRoot = require('app-root-path');
var winston = require('winston');

// define the custom settings for each transport (file, console)
var options = {
  app: {
    level: 'debug',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  book: {
    level: 'debug',
    filename: `${appRoot}/logs/books.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  user: {
    level: 'debug',
    filename: `${appRoot}/logs/users.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
const appLogger = new winston.Logger({
  transports: [
    new winston.transports.File(options.app),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

const bookLogger = new winston.Logger({
  transports: [
    new winston.transports.File(options.book),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

const userLogger = new winston.Logger({
  transports: [
    new winston.transports.File(options.user),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

module.exports = {
  appLogger:appLogger,
  bookLogger:bookLogger,
  userLogger:userLogger
};
