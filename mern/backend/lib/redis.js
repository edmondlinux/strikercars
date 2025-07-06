
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Clean up the Redis URL if it contains CLI command syntax
let redisUrl = process.env.UPSTASH_REDIS_URL;

if (redisUrl && redisUrl.includes("redis-cli")) {
  // Extract just the URL part from the CLI command
  const urlMatch = redisUrl.match(/redis:\/\/[^\s]+/);
  if (urlMatch) {
    redisUrl = urlMatch[0];
  }
}

// Create Redis connection with error handling
export const redis = new Redis(redisUrl, {
  retryDelayOnFailover: 100,
  enableReadyCheck: false,
  lazyConnect: true,
  maxRetriesPerRequest: 3,
  // Add TLS configuration for Upstash
  tls: {
    rejectUnauthorized: false
  }
});

// Handle connection errors gracefully
redis.on('error', (err) => {
  console.log('Redis connection error:', err.message);
});

redis.on('connect', () => {
  console.log('Redis connected successfully');
});
