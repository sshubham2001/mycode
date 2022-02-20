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

export default function Notification({ onClear, feedBtnClick }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const alerts = useSelector((state) => state.dashboard.newAlert);
  const [data, setData] = useState([]);
  useEffect(() => {
    alerts && setData([alerts]);
  }, [alerts]);
  const clearAlert = () => {
    dispatch({ type: "CLEAR_ALERT" });
  };
  return (
    <div>
      <Header>
        <Heading>Notification</Heading>
        <ClearAll onClick={() => clearAlert()}>Clear all</ClearAll>
      </Header>
      <Body>
        {data && data.length ? (
          data.map((item, index) => <NotificationCard key={index} {...item} />)
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
