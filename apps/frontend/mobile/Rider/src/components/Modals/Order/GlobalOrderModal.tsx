import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../redux/store';
import {hideOrderModal} from '../../../redux/slices/orderSlice';
import OrderModal from './OrderModal';

const GlobalOrderModal: React.FC = () => {
  const dispatch = useDispatch();
  const {isModalVisible, selectedOrder} = useSelector(
    (state: RootState) => state.order,
  );

  const handleClose = () => {
    dispatch(hideOrderModal());
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
    />
  );
};

export default GlobalOrderModal;
