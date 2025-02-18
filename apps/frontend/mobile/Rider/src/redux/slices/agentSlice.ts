import {Alert} from 'react-native';
import apiClient from '../../api/apiClient';
import apiEndPoints from '../../api/apiEndPoints';

export enum AgentStatusEnum {
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
}
/**
 * Updates the agent's status (ONLINE or OFFLINE).
 *
 * @param status - The new status for the agent.
 * @returns A promise that resolves when the status is updated.
 */
export const updateAgentStatus = async (
  status: AgentStatusEnum,
): Promise<void> => {
  try {
    const response = await apiClient.patch(apiEndPoints.updateAgentStatus, {
      status,
    });

    if (response.data.success) {
      console.log('✅ Agent status updated successfully.');
    } else {
      const errorMessage = response.data?.message || 'Failed to update status.';
      Alert.alert('Error', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error: any) {
    console.error('❌ Failed to update agent status:', error);

    // Check if error response matches the backend format
    if (
      error.response &&
      error.response.data &&
      typeof error.response.data.message === 'string'
    ) {
      Alert.alert('Error', error.response.data.message);
    } else {
      // Fallback for unexpected errors
      Alert.alert('Error', 'An error occurred while updating status.');
    }

    throw error; // Optionally re-throw the error if you want to handle it further up
  }
};
