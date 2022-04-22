import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "baseui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";
import useSound from "use-sound";
import notificationSfx from "../../../../assets/sound/order_alert.mp3";
import { useHistory } from "react-router-dom";

const Index = () => {
  const history = useHistory();
  const realTimeNotification = useSelector((state) => state.rtNotify);
  const [isOpen, setIsOpen] = useState(false);
  const [play] = useSound(notificationSfx);

  useEffect(() => {
    if (realTimeNotification.message) {
      play();
      setIsOpen(true);
    }
  }, [realTimeNotification]);

  const close = () => {
    setIsOpen(false);
  };

  const onClickviewOrder = (e) => {
    if (realTimeNotification.orderId) {
      history.push(`/view-order/${realTimeNotification.orderId}`);
    }
    setIsOpen(false);
  };

  return (
    <>
      <Modal onClose={close} isOpen={isOpen}>
        <ModalHeader>New Order</ModalHeader>
        <ModalBody>New order has been placed</ModalBody>
        <ModalFooter>
          <ModalButton kind="tertiary" onClick={close}>
            Dismiss
          </ModalButton>
          <ModalButton onClick={onClickviewOrder}>View</ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Index;
