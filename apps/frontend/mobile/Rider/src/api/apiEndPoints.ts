const baseURL = 'http://192.168.29.63:3000';

const createEndpoint = (path: string) => `${baseURL}${path}`;

const apiEndpoints = {
  baseURL,
  requestOtp: createEndpoint('/auth/otp/request'),
  veryfyOtp: createEndpoint('/auth/otp/verify'),
  login: createEndpoint('/auth/login'),
  refreshToken: createEndpoint('/auth/refresh_token'),
  agentSignup: createEndpoint('/agent/signup'),
  fetchProfile: '/profile',
  fetchVehicles: '/vehicles',
  uploadMedia: createEndpoint('/media/upload'),
  agentDoc: createEndpoint('/agent/document'),
};

export default apiEndpoints;
