import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import {
  Body,
  Header,
  Heading,
  ClearAll,
  Footer,
  FeedsButton,
} from "./Notification.style";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setOrderAlertAsRead } from "../../store/actions/orderAlert";

export default function Notification({ onClear, feedBtnClick }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const alerts = useSelector((state) => state.orderAlert.data);
  const [data, setData] = useState([]);
  useEffect(() => {
    alerts && setData(alerts);
  }, [alerts]);

  const clearAlert = () => {
    dispatch({ type: "CLEAR_ORDER_ALERT" });
  };

  const onNotificationClick = (e, item) => {
    if (!item.isRead) dispatch(setOrderAlertAsRead(true, item._id));
    history.push(`/view-order/${item.orderId}`);
  };

  return (
    <div>
      <Header>
        <Heading>Notification</Heading>
        <ClearAll onClick={() => clearAlert()}>Clear all</ClearAll>
      </Header>
      <Body>
        {data && data.length ? (
          data.map((item, index) => (
            <div
              onClick={(e) => {
                onNotificationClick(e, item);
              }}
              key={index}
            >
              <NotificationCard {...item} />
            </div>
          ))
        ) : (
          <NotificationCard />
        )}
      </Body>
      <Footer>
        <FeedsButton onClick={() => history.push("/orders")}>
          View Orders
        </FeedsButton>
      </Footer>
    </div>
  );
}
