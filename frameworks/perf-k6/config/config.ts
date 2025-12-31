// Environment configuration
const ENV_URLS = {
  dev: 'https://petstore.swagger.io/v2',
  staging: 'https://petstore.swagger.io/v2',
  uat: 'https://petstore.swagger.io/v2',
};

// Get environment from k6 environment variable, default to 'dev'
const environment = ((__ENV as Record<string, string>).ENVIRONMENT || 'dev') as keyof typeof ENV_URLS;
console.log(`[Config] Running tests against the '${environment}' environment.`);

// Export the base URL for the current environment
export const BASE_URL = ENV_URLS[environment] || ENV_URLS.dev;
export const ENVIRONMENT = environment;
