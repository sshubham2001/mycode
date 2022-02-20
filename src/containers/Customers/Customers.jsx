import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { styled, withStyle } from "baseui";
import {
  Grid,
  Row as Rows,
  Col as Column,
} from "../../Components/FlexBox/FlexBox";
// import Input from "../../Components/Input/Input";
// import Select from "../../Components/Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper, Header, Heading } from "../../Components/Wrapper.style";
import { fetchUser } from "../../store/actions/user.js";
import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from "./Customers.style";
import NoResult from "../../Components/NoResult/NoResult";
import Button from "../../Components/Button/Button";

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

const ImageWrapper = styled("div", ({ $theme }) => ({
  width: "38px",
  height: "38px",
  overflow: "hidden",
  display: "inline-block",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  borderBottomRightRadius: "20px",
  borderBottomLeftRadius: "20px",
  backgroundColor: $theme.colors.backgroundF7,
}));

const Image = styled("img", () => ({
  width: "100%",
  height: "auto",
}));

const sortByOptions = [
  { value: "highestToLowest", label: "Highest To Lowest" },
  { value: "lowestToHighest", label: "Lowest To Highest" },
];

const data = [];

export default function Customers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const users = useSelector((state) => state.dashboard.users);

  const [stock, setStock] = useState([]);
  const [search, setSearch] = useState([]);
  const [visible, setVisible] = useState(20);

  const handleLoadMore = () => {
    setVisible((prevValue) => prevValue + 20);
  };

  function handleSort({ value }) {
    setStock(value);
  }
  function handleSearch(event) {
    const value = event.currentTarget.value;
    console.log(value, "cus val");
    setSearch(value);
  }
  // console.log(data, "data");

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: "0 0 5px rgba(0, 0 ,0, 0.05)",
            }}
          >
            <Col md={3}>
              <Heading>Customers</Heading>
            </Col>
            <h2>
              Total Customers:{" "}
              {users && users.length ? users.length : "Loading..."}
            </h2>
            {/* <Col md={9}>
              <Row>
                <Col md={9}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={3}>
                  <Select
                    options={sortByOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Order Amount"
                    value={stock}
                    searchable={false}
                    onChange={handleSort}
                  />
                </Col>
              </Row>
            </Col> */}
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(150px, 70px) minmax(200px, 70px) minmax(160px, auto) minmax(250px, auto) minmax(180px, auto) minmax(150px, auto)">
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Name</StyledHeadCell>
                <StyledHeadCell>Contacts</StyledHeadCell>
                <StyledHeadCell>Email</StyledHeadCell>
                <StyledHeadCell>Total Order (Count)</StyledHeadCell>
                <StyledHeadCell>Joining Date</StyledHeadCell>

                {users ? (
                  users.length ? (
                    users?.slice(0, visible).map((row, index) => (
                      <React.Fragment key={index}>
                        <StyledBodyCell>
                          {row._id.substring(0, 12)}
                        </StyledBodyCell>
                        <StyledBodyCell>{row.name}</StyledBodyCell>
                        <StyledBodyCell>{row.phone}</StyledBodyCell>
                        <StyledBodyCell>{row.email}</StyledBodyCell>
                        <StyledBodyCell>
                          ₹{row.totalPrice?.toFixed(2)}
                          {` (${row.totalOrder})`}
                        </StyledBodyCell>
                        <StyledBodyCell>
                          {dayjs(row.createdAt).format("DD MMM YYYY")}
                        </StyledBodyCell>
                      </React.Fragment>
                    ))
                  ) : (
                    <NoResult
                      hideButton={false}
                      style={{
                        gridColumnStart: "1",
                        gridColumnEnd: "one",
                      }}
                    />
                  )
                ) : null}
                {users && users.length > 20 && visible < users.length ? (
                  <Col
                    md={20}
                    style={{
                      width: "125px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <a onClick={handleLoadMore}>Load More {">>"}</a>
                  </Col>
                ) : null}
              </StyledTable>
            </TableWrapper>
          </Wrapper>
        </Col>
      </Row>
    </Grid>
  );
}
