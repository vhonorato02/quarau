import pino from 'pino'

/** Structured JSON logs (stdout), collected by Docker's log driver. */
export const logger = pino({
  level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  base: { service: 'quarau-web' },
  redact: { paths: ['email', 'data.email', 'phone', '*.password', 'req.headers.authorization', 'req.headers.cookie'], remove: true },
  timestamp: pino.stdTimeFunctions.isoTime,
})
