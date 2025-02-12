import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../redux/store';
import {hideOrderModal} from '../../../redux/slices/orderSlice';
import OrderModal from './OrderModal';
import {useNavigation} from '@react-navigation/native';
import {DeliverAPackage} from '../../../navigation/ScreenNames';
import {SendPackageOrder} from '../../../redux/slices/types/sendAPackage';
import {navigate} from '../../../navigation/NavigationService';

const GlobalOrderModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {isModalVisible, selectedOrder} = useSelector(
    (state: RootState) => state.order,
  );

  const handleClose = () => {
    dispatch(hideOrderModal());
  };

  const handleAcceptOrderSuccess = (order: SendPackageOrder) => {
    navigation.navigate(DeliverAPackage.PickUpOrderDetails, {order});
  };

  return (
    <OrderModal
      isVisible={isModalVisible}
      onClose={handleClose}
      earnings={selectedOrder?.earnings || ''}
      tip={selectedOrder?.tip || ''}
      time={selectedOrder?.time || ''}
      distance={selectedOrder?.distance || ''}
      pickupAddress={selectedOrder?.pickupAddress || ''}
      dropoffAddress={selectedOrder?.dropoffAddress || ''}
      orderId={selectedOrder?.orderId || ''}
      onAcceptOrderSuccess={handleAcceptOrderSuccess}
    />
  );
};

export default GlobalOrderModal;
