import apiClient from '../../api/apiClient';
import apiEndPoints from '../../api/apiEndPoints';

export enum AgentStatusEnum {
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
}

export type DocumentError = {
  id: string;
  heading: string;
  text: string;
};

export type UpdateResult = {
  generatedMaps: any[];
  raw: any[];
  affected: number;
};

export type IApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const updateAgentStatus = async (
  status: AgentStatusEnum,
): Promise<IApiResponse<UpdateResult | DocumentError[]>> => {
  try {
    const response = await apiClient.patch(apiEndPoints.updateAgentStatus, {
      status,
    });
    console.log('Agent status.', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Failed to update agent status:', error);
    throw error;
  }
};
