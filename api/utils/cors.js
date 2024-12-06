import cors from 'cors';
import process from 'node:process';
import { corsConfig } from '../config/cors.js';

const corsMiddleware = ({
  acceptedOrigin = corsConfig.whitelist,
  allowAllOrigins = process.env.NODE_ENV !== 'production'
} = {}) =>
  cors({
    origin: (origin, callback) => {
      if (allowAllOrigins) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      const isAllowed = acceptedOrigin.some(
        (allowedOrigin) =>
          typeof allowedOrigin === 'string'
            ? allowedOrigin === origin
            : allowedOrigin instanceof RegExp &&
              allowedOrigin.test(origin)
      );

      if (isAllowed) {
        return callback(null, true);
      }

      callback(new Error('Origin not allowed'));
    }
  });

export default corsMiddleware;
