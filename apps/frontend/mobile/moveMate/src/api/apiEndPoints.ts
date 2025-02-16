const baseURL = "http://18.225.92.240:3000";

const createEndpoint = (path: string) => `${baseURL}${path}`;

const apiEndpoints = {
  baseURL,
  requestOtp: createEndpoint("/auth/otp/request"),
  veryfyOtp: createEndpoint("/auth/otp/verify"),
  login: createEndpoint("/auth/login"),
  refreshToken: createEndpoint("/auth/refresh_token"),
  userSignup: createEndpoint("/user/signup"),
  fetchProfile: "/profile",
  fetchVehicles: "/vehicles",
  uploadMedia: createEndpoint("/media/upload"),
  agentDoc: createEndpoint("/agent/document"),
  createOrder: createEndpoint("/order/send-package/create"),
  cancelOrder: createEndpoint("/order/send-package/:orderId/cancel"),
  reportAgent: createEndpoint("/order/send-package/:orderId/reportagent"),
  leaveAReview: createEndpoint("/order/send-package/:orderId/review"),
  getOrderDetails: createEndpoint("/order/send-package/:orderId"),
  assignRider: createEndpoint("assign-rider/:orderId"),
  createPaymentIntent: createEndpoint("/payment/create-payment-intent"),
};

export default apiEndpoints;
