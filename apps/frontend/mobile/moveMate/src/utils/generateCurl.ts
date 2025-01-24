import { AxiosRequestConfig } from 'axios';
// Helper function to generate cURL command, we will keep it only for development and debug purpose
export const generateCurlCommand = (config: AxiosRequestConfig): string => {
    const { method = 'GET', url, headers = {}, data } = config;
    let curl = `curl -X ${method.toUpperCase()} '${url}'`;
  
    // Add headers
    Object.entries(headers).forEach(([key, value]) => {
      curl += ` -H '${key}: ${value}'`;
    });
  
    // Add data if present
    if (data) {
      const formattedData = typeof data === 'object' ? JSON.stringify(data) : data;
      curl += ` --data '${formattedData}'`;
    }
  
    return curl;
  };