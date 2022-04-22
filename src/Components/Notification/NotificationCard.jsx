import React from "react";
import {
  BoldTitle,
  Title,
  Message,
  Time,
  TitleWrapper,
  Dot,
  Details,
} from "./Notification.style";
import dayjs from "dayjs";

export default function NotificationCard({ onItemClick, ...item }) {
  return item.title ? (
    <Message onClick={onItemClick}>
      <TitleWrapper>
        {!item.isRead ? (
          <BoldTitle>{item && item.title}</BoldTitle>
        ) : (
          <Title>{item && item.title}</Title>
        )}
        <Dot />
        <Time>{item && dayjs(item?.createdAt).format("DD/MM/YY hh:mmA")}</Time>
      </TitleWrapper>

      <Details>OrderID: {item && item?.orderId?.slice(0, 12)}</Details>
    </Message>
  ) : (
    <Message>
      <Details>No notifications. Try reloading!</Details>
    </Message>
  );
}
