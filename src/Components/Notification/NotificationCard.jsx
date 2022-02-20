import React from "react";
import {
  Title,
  Message,
  Time,
  TitleWrapper,
  Dot,
  Details,
} from "./Notification.style";
import dayjs from "dayjs";

export default function NotificationCard(item) {
  return item.title ? (
    <Message>
      <TitleWrapper>
        <Title>{item && item.title}</Title>
        <Dot />
        <Time>{item && dayjs(item.createAt).format("DD/MM/YY hh:mmA")}</Time>
      </TitleWrapper>

      <Details>OrderID: {item && item?.orderId?.slice(0, 12)}</Details>
    </Message>
  ) : (
    <Message>
      <Details>No notifications. Try reloading!</Details>
    </Message>
  );
}
