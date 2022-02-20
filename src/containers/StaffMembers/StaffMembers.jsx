import React, { useCallback, useState, useEffect } from "react";
import dayjs from "dayjs";
import { withStyle } from "baseui";
import {
  Grid,
  Row as Rows,
  Col as Column,
} from "../../Components/FlexBox/FlexBox";
import { useDrawerDispatch } from "../../context/DrawerContext";
import Select from "../../Components/Select/Select";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "../../assets/icons/Plus";

// import { useQuery, gql } from "@apollo/client";

import { Wrapper, Header, Heading } from "../../Components/Wrapper.style";

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from "./StaffMembers.style";
import NoResult from "../../Components/NoResult/NoResult";
import { fetchAdminUser } from "../../store/actions/roles";

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

const roleSelectOptions = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "member", label: "Member" },
  { value: "delivery boy", label: "Delivery boy" },
];

const data = [];

export default function StaffMembers() {
  const dispatch = useDrawerDispatch();
  const reduxDispatch = useDispatch();
  const openDrawer = useCallback(
    () =>
      dispatch({ type: "OPEN_DRAWER", drawerComponent: "STAFF_MEMBER_FORM" }),
    [dispatch]
  );

  useEffect(() => {
    reduxDispatch(fetchAdminUser());
  }, []);

  const admins = useSelector((state) => state.dashboard.admins);

  const [role, setRole] = useState([]);
  const [search, setSearch] = useState("");

  function handleCategory({ value }) {
    setRole(value);
  }
  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value);
  }

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 40,
              boxShadow: "0 0 5px rgba(0, 0 ,0, 0.05)",
            }}
          >
            <Col md={3} xs={12}>
              <Heading>Staff Members</Heading>
            </Col>

            <Col md={9} xs={12}>
              <Row>
                {/* <Col md={3} xs={12}>
                  <Select
                    options={roleSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Role"
                    value={role}
                    searchable={false}
                    onChange={handleCategory}
                  />
                </Col> */}

                {/* <Col md={5} xs={12}>
                  <Input
                    value={search}
                    placeholder="Ex: Quick Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col> */}

                <Col md={4} xs={12}>
                  <Button
                    onClick={openDrawer}
                    startEnhancer={() => <Plus />}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: "100%",
                          borderTopLeftRadius: "3px",
                          borderTopRightRadius: "3px",
                          borderBottomLeftRadius: "3px",
                          borderBottomRightRadius: "3px",
                        }),
                      },
                    }}
                  >
                    Add Members
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(130px, 70px) minmax(200px, max-content) minmax(270px, max-content) minmax(150px, max-content) minmax(150px, auto) minmax(150px, auto)">
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Name</StyledHeadCell>
                <StyledHeadCell>Email</StyledHeadCell>
                <StyledHeadCell>Contact</StyledHeadCell>
                <StyledHeadCell>Joining Date</StyledHeadCell>
                <StyledHeadCell>Role</StyledHeadCell>

                {admins ? (
                  admins.length ? (
                    admins.map((row, index) => (
                      <React.Fragment key={index}>
                        <StyledBodyCell>{row._id.slice(0, 12)}</StyledBodyCell>
                        <StyledBodyCell>{row.name}</StyledBodyCell>
                        <StyledBodyCell>{row.email}</StyledBodyCell>
                        <StyledBodyCell>{row.phone}</StyledBodyCell>
                        <StyledBodyCell>
                          {dayjs(row.createdAt).format("DD MMM YYYY")}
                        </StyledBodyCell>
                        <StyledBodyCell>{row.role}</StyledBodyCell>
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
              </StyledTable>
            </TableWrapper>
          </Wrapper>
        </Col>
      </Row>
    </Grid>
  );
}
