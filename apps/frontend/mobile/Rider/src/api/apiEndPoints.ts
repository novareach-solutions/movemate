// src/api/apiEndPoints.ts

const baseURL = 'http://192.168.29.63:3000'; 

const createEndpoint = (path: string) => `${baseURL}${path}`;

const apiEndPoints = {
  baseURL,
  requestOtp: createEndpoint('/auth/otp/request'),
  verifyOtp: createEndpoint('/auth/otp/verify'),
  login: createEndpoint('/auth/login?role=AGENT'),
  refreshToken: createEndpoint('/auth/refresh-token'),
  agentSignup: createEndpoint('/agent/signup'),
  fetchProfile: createEndpoint('/agent/profile'),
  fetchVehicles: createEndpoint('/vehicles'),
  uploadMedia: createEndpoint('/media/upload'),
  agentDoc: createEndpoint('/agent/document'),
  updateAgentStatus: createEndpoint('/agent/status'),
  acceptOrder: (orderId: string) =>
    createEndpoint(`/order/send-package/agent/${orderId}/accept`),
  updateLocation: createEndpoint(`/agent/location`),
  getOngoingOrder: createEndpoint('/agent/ongoingorder'),
  verifyItemsPhoto: (orderId: number) =>
    createEndpoint(`/order/send-package/agent/${orderId}/verify-items-photo`),
  startOrder: (orderId: number) =>
    createEndpoint(`/order/send-package/agent/${orderId}/start`),
  updateOrderStatus: (orderId: number) =>
    createEndpoint(`/order/send-package/${orderId}/status`),
  proofOfDelivery: (orderId: number) =>
    createEndpoint(`/order/send-package/agent/${orderId}/proof-of-delivery`),
  completeOrder: (orderId: number) =>
    createEndpoint(`/order/send-package/agent/${orderId}/complete`),
};

export default apiEndPoints;
