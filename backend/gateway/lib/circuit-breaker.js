const CircuitBreaker = require('opossum');
const axios = require('axios');

// Create a wrapped axios instance for each service
function createServiceClient(serviceName, baseURL) {
    const instance = axios.create({
        baseURL,
        timeout: 3000,
    });

    const breaker = new CircuitBreaker(
        async function request(config) {
            try {
                const response = await instance(config);
                return response;
            } catch (err) {
                if (err.response) {
                    // Non-5xx responses should not trip the breaker
                    if (err.response.status < 500) {
                        return err.response;
                    }
                }
                throw err;
            }
        },
        {
            timeout: 3000, // Time in ms before request is considered failed
            errorThresholdPercentage: 50, // When 50% of requests fail, open the circuit
            resetTimeout: 10000, // Time to wait before attempting to close circuit
            rollingCountTimeout: 10000, // Window size for error rate calculation
            name: serviceName,
        }
    );

    // Log circuit state changes
    breaker.on('open', () => console.log(`Circuit ${serviceName} opened`));
    breaker.on('halfOpen', () => console.log(`Circuit ${serviceName} half-opened`));
    breaker.on('close', () => console.log(`Circuit ${serviceName} closed`));

    return { breaker, instance };
}

// Exponential backoff retry decorator
function withRetry(fn, maxRetries = 3, initialDelay = 100) {
    return async function retry(...args) {
        let retries = 0;
        let lastError;

        while (retries < maxRetries) {
            try {
                return await fn(...args);
            } catch (err) {
                lastError = err;
                retries++;
                if (retries === maxRetries) break;

                const delay = initialDelay * Math.pow(2, retries - 1);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        throw lastError;
    };
}

// Create circuit-protected service endpoints
function createServiceEndpoints() {
    const services = {
        user: createServiceClient('user-service', 'http://user:3001'),
        post: createServiceClient('post-service', 'http://post:3002'),
        comment: createServiceClient('comment-service', 'http://comment:3003')
    };

    // Wrap each service with retry logic
    return Object.entries(services).reduce((acc, [name, service]) => {
        const wrapped = withRetry(async (config) => {
            return await service.breaker.fire(config);
        });

        acc[name] = {
            ...service,
            request: wrapped
        };
        return acc;
    }, {});
}

module.exports = { createServiceEndpoints };