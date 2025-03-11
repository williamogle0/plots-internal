const config = {
  isDev: window.location.origin.includes('dev.') || window.location.origin.includes('localhost'),
  aws: {
    aws_project_region: 'us-east-2',
    aws_appsync_graphqlEndpoint: import.meta.env.VITE_API_URL,
    aws_appsync_region: 'us-east-2',
    aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    aws_appsync_apiKey: import.meta.env.VITE_API_KEY,
    aws_cognito_identity_pool_id: import.meta.env.VITE_IDENTITY_POOL_ID,
    aws_cognito_region: 'us-east-2',
    aws_user_pools_id: import.meta.env.VITE_USER_POOL_ID,
    aws_user_pools_web_client_id: import.meta.env.VITE_WEB_CLIENT_ID,
    oauth: {},
    aws_cognito_username_attributes: ['EMAIL', 'PHONE_NUMBER'],
    aws_cognito_social_providers: [],
    aws_cognito_signup_attributes: ['PHONE_NUMBER'],
    aws_cognito_mfa_configuration: 'OFF',
    aws_cognito_mfa_types: ['SMS'],
    aws_cognito_password_protection_settings: {
      passwordPolicyMinLength: 8,
      passwordPolicyCharacters: [],
    },
    aws_cognito_verification_mechanisms: ['PHONE_NUMBER'],
    aws_user_files_s3_bucket: import.meta.env.VITE_STORAGE_BUCKET,
    aws_user_files_s3_bucket_region: 'us-east-2',
  },
  datadog: {
    clientToken: import.meta.env.VITE_DATADOG_CLIENT_TOKEN || '',
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sampleRate: 100,
    service: `plots-admin-${process.env.MODE}`,
    env: import.meta.env.MODE,
  },
};

const Configuration = typeof config;

export { config };
export { Configuration };