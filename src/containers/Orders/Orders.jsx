import React, { useState, useEffect } from "react";
import { styled, withStyle, createThemedUseStyletron } from "baseui";
import dayjs from "dayjs";
import {
  Grid,
  Row as Rows,
  Col as Column,
} from "../../Components/FlexBox/FlexBox";
import Select from "../../Components/Select/Select";
import Input from "../../Components/Input/Input";
import { Wrapper, Header, Heading } from "../../Components/Wrapper.style";
import { useSelector, useDispatch } from "react-redux";

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
} from "./Orders.style";
import NoResult from "../../Components/NoResult/NoResult";
import { fetchOrder, viewOrder } from "../../store/actions/order";
import { useHistory } from "react-router-dom";
import Button from "../../Components/Button/Button";

const themedUseStyletron = createThemedUseStyletron();

const Status = styled("div", ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textDark,
  display: "flex",
  alignItems: "center",
  lineHeight: "1",
  textTransform: "capitalize",

  ":before": {
    content: '""',
    width: "10px",
    height: "10px",
    display: "inline-block",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    backgroundColor: $theme.borders.borderE6,
    marginRight: "10px",
  },
}));

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  "@media only screen and (min-width: 768px)": {
    alignItems: "center",
  },
}));

const statusSelectOptions = [
  { value: "Received", label: "Received" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Dispatched", label: "Dispatched" },
  { value: "Delivered", label: "Delivered" },
  { value: "Cancelled", label: "Cancelled" },
];

const limitSelectOptions = [
  { value: 7, label: "Last 7 orders" },
  { value: 15, label: "Last 15 orders" },
  { value: 30, label: "Last 30 orders" },
];

const data = [{ id: 1, amount: 300, contact: "962163546565" }];

export default function Orders() {
  const reduxDispatch = useDispatch();
  const history = useHistory();
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);
  const [mainOrder, setMainOrder] = useState([]);
  const [cloneData, setCloneData] = useState([]);

  useEffect(() => {
    reduxDispatch(fetchOrder(history));
  }, []);

  const orders = useSelector((state) => state.dashboard.orders);
  useEffect(() => {
    orders && setCloneData(orders);
    orders && setMainOrder(orders);
  }, [orders]);

  const handleView = (order) => {
    reduxDispatch(viewOrder(order));
    history.push(`/view-order/${order._id}`);
  };

  const [useCss, theme] = themedUseStyletron();
  const sent = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });
  const failed = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });
  const processing = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.textNormal,
    },
  });
  const paid = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.blue400,
    },
  });

  const [status, setStatus] = useState([]);
  const [limit, setLimit] = useState([]);
  const [search, setSearch] = useState([]);

  function handleStatus({ value }) {
    setStatus(value);
    console.log(value);
    if (value.length) {
      let filterOrder = mainOrder.filter((item) => {
        return item.status == value[0]?.value;
      });
      setCloneData(filterOrder);
    } else {
      setCloneData(mainOrder);
    }
  }

  function handleLimit({ value }) {
    setLimit(value);
  }
  function handleSearch(event) {
    const { value } = event.currentTarget;
    setSearch(value);
  }
  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.orders.map((order) => order.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }

  function handleCheckbox(event) {
    const { name } = event.currentTarget;
    if (!checkedId.includes(name)) {
      setCheckedId((prevState) => [...prevState, name]);
    } else {
      setCheckedId((prevState) => prevState.filter((id) => id !== name));
    }
  }
  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: "0 0 8px rgba(0, 0 ,0, 0.1)",
            }}
          >
            <Col md={3} xs={12}>
              <Heading>Orders</Heading>
            </Col>

            <Col md={9} xs={12}>
              <Row>
                <Col md={3} xs={12}>
                  <Select
                    options={statusSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Status"
                    value={status}
                    searchable={false}
                    onChange={handleStatus}
                  />
                </Col>

                <Col md={3} xs={12}>
                  <Button onClick={() => window.location.reload()}>
                    Refresh
                  </Button>
                </Col>

                {/* <Col md={3} xs={12}>
                  <Select
                    options={limitSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    value={limit}
                    placeholder="Order Limits"
                    searchable={false}
                    onChange={handleLimit}
                  />
                </Col> */}

                {/* <Col md={6} xs={12}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Address"
                    onChange={handleSearch}
                    clearable
                  />
                </Col> */}
              </Row>
            </Col>
          </Header>
          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(100px, 70px) minmax(150px, auto) minmax(150px, auto) minmax(200px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                <StyledHeadCell>Items</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Customer Name</StyledHeadCell>
                <StyledHeadCell>Time</StyledHeadCell>
                <StyledHeadCell>Delivery Address</StyledHeadCell>
                <StyledHeadCell>Amount</StyledHeadCell>
                <StyledHeadCell>Payment</StyledHeadCell>
                <StyledHeadCell>Contact</StyledHeadCell>

                {cloneData ? (
                  cloneData.length ? (
                    cloneData.map((row, index) => (
                      <React.Fragment key={index}>
                        <StyledCell>
                          <a onClick={() => handleView(row)}>View</a>
                        </StyledCell>
                        <StyledCell>
                          {/* <Status
                            className={
                              row.status.toLowerCase() === "delivered"
                                ? sent
                                : row.status.toLowerCase() === "confirmed"
                                ? paid
                                : row.status.toLowerCase() === "processing"
                                ? processing
                                : row.status.toLowerCase() === "failed"
                                ? failed
                                : ""
                            }
                          >
                            {row[8]}
                          </Status> */}
                          <p>{row.status}</p>
                        </StyledCell>
                        <StyledCell>{row._id.substring(0, 12)}</StyledCell>
                        <StyledCell>{row.user?.name}</StyledCell>
                        <StyledCell>
                          {dayjs(row.date).format("DD-MM-YYYY hh:mm A")}
                        </StyledCell>
                        <StyledCell>{row.shippingAddress?.address}</StyledCell>
                        <StyledCell>₹{row.total}</StyledCell>
                        <StyledCell>{row.payment}</StyledCell>
                        <StyledCell>{row.user?.phone}</StyledCell>
                      </React.Fragment>
                    ))
                  ) : (
                    <NoResult
                      title="Waiting for orders..."
                      hideButton={true}
                      style={{
                        gridColumnStart: "1",
                        gridColumnEnd: "one",
                      }}
                    />
                  )
                ) : null}
              </StyledTable>
            </TableWrapper>
          </Wrapper>
        </Col>
      </Row>
    </Grid>
  );
}
