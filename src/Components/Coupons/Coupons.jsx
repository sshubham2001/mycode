import React, { useCallback, useState } from "react";
import dayjs from "dayjs";
import { withStyle, createThemedUseStyletron } from "baseui";
import {
  Grid,
  Row as Rows,
  Col as Column,
} from "../../Components/FlexBox/FlexBox";
import { useDrawerDispatch } from "../../context/DrawerContext";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";

import Select from "../../Components/Select/Select";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";

import { Plus } from "../../assets/icons/Plus";
// import { useQuery, gql } from "@apollo/client";
import { Wrapper, Header, Heading } from "../../Components/Wrapper.style";
import Checkbox from "../../Components/CheckBox/CheckBox";

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
  ProgressWrapper,
  ProgressText,
  Status,
} from "./Coupons.style";
import NoResult from "../../Components/NoResult/NoResult";

const themedUseStyletron = createThemedUseStyletron();

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
  { value: "active", label: "Active" },
  { value: "revoked", label: "Revoked" },
];

const data = [];

export default function Coupons() {
  const dispatch = useDrawerDispatch();
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);

  const openDrawer = useCallback(
    () => dispatch({ type: "OPEN_DRAWER", drawerComponent: "CAMPAING_FORM" }),
    [dispatch]
  );
  const [status, setStatus] = useState([]);
  const [search, setSearch] = useState("");
  const [useCss, theme] = themedUseStyletron();
  const active = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });
  const revoked = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });

  function handleSelect({ value }) {
    setStatus(value);
  }

  function handleSearch(event) {
    const value = event.currentTarget.value;

    setSearch(value);
  }
  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.coupons.map((coupon) => coupon.id);
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

  const numberToPercent = (num, total) => {
    return (num * 100) / total;
  };

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
            <Col md={2}>
              <Heading>Campaigns</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col md={3}>
                  <Select
                    options={statusSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Status"
                    value={status}
                    searchable={false}
                    onChange={handleSelect}
                  />
                </Col>

                <Col md={5}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={4}>
                  <Button
                    onClick={openDrawer}
                    startEnhancer={() => <Plus />}
                    overrides={{
                      BaseButton: {
                        style: ({ $theme, $size, $shape }) => {
                          return {
                            width: "100%",
                            borderTopLeftRadius: "3px",
                            borderTopRightRadius: "3px",
                            borderBottomLeftRadius: "3px",
                            borderBottomRightRadius: "3px",
                          };
                        },
                      },
                    }}
                  >
                    Create Campaign
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(70px, 70px) minmax(200px, auto) minmax(200px, auto) minmax(200px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                <StyledHeadCell>
                  <Checkbox
                    type="checkbox"
                    value="checkAll"
                    checked={checked}
                    onChange={onAllCheck}
                    overrides={{
                      Checkmark: {
                        style: {
                          borderTopWidth: "2px",
                          borderRightWidth: "2px",
                          borderBottomWidth: "2px",
                          borderLeftWidth: "2px",
                          borderTopLeftRadius: "4px",
                          borderTopRightRadius: "4px",
                          borderBottomRightRadius: "4px",
                          borderBottomLeftRadius: "4px",
                        },
                      },
                    }}
                  />
                </StyledHeadCell>
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Campaigns Name</StyledHeadCell>
                <StyledHeadCell>Code</StyledHeadCell>
                <StyledHeadCell>Remaining coupon</StyledHeadCell>
                <StyledHeadCell>Expiration Date</StyledHeadCell>
                <StyledHeadCell>Creation Date</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>

                {data ? (
                  data.length ? (
                    data
                      .map((item) => Object.values(item))
                      .map((row, index) => {
                        return (
                          <React.Fragment key={index}>
                            <StyledBodyCell>
                              <Checkbox
                                name={row[1]}
                                checked={checkedId.includes(row[1])}
                                onChange={handleCheckbox}
                                overrides={{
                                  Checkmark: {
                                    style: {
                                      borderTopWidth: "2px",
                                      borderRightWidth: "2px",
                                      borderBottomWidth: "2px",
                                      borderLeftWidth: "2px",
                                      borderTopLeftRadius: "4px",
                                      borderTopRightRadius: "4px",
                                      borderBottomRightRadius: "4px",
                                      borderBottomLeftRadius: "4px",
                                    },
                                  },
                                }}
                              />
                            </StyledBodyCell>
                            <StyledBodyCell>{row[1]}</StyledBodyCell>
                            <StyledBodyCell>{row[2]}</StyledBodyCell>
                            <StyledBodyCell>{row[3]}</StyledBodyCell>
                            <StyledBodyCell>
                              <ProgressWrapper>
                                <ProgressBar
                                  value={numberToPercent(row[4], row[5])}
                                  successValue={100}
                                  overrides={{
                                    Bar: {
                                      style: () => {
                                        return {
                                          backgroundColor: "#F2F2F2",
                                          marginLeft: "0px",
                                          marginRight: "0px",
                                          height: "4px",
                                          borderTopLeftRadius: "5px",
                                          borderTopRightRadius: "5px",
                                          borderBottomLeftRadius: "5px",
                                          borderBottomRightRadius: "5px",
                                          position: "relative",
                                        };
                                      },
                                    },
                                    BarProgress: {
                                      style: ({ $theme }) => {
                                        return {
                                          backgroundColor:
                                            $theme.colors.primary,
                                          borderTopLeftRadius: "5px",
                                          borderTopRightRadius: "5px",
                                          borderBottomLeftRadius: "5px",
                                          borderBottomRightRadius: "5px",
                                        };
                                      },
                                    },
                                  }}
                                />

                                <ProgressText>{`${row[4] ? row[4] : 0} of ${
                                  row[5]
                                } codes remaining`}</ProgressText>
                              </ProgressWrapper>
                            </StyledBodyCell>
                            <StyledBodyCell>
                              {dayjs(row[6]).format("DD MMM YYYY")}
                            </StyledBodyCell>
                            <StyledBodyCell>
                              {dayjs(row[7]).format("DD MMM YYYY")}
                            </StyledBodyCell>
                            <StyledBodyCell>
                              <Status
                                className={
                                  row[8] === "active"
                                    ? active
                                    : row[8] === "revoked"
                                    ? revoked
                                    : ""
                                }
                              >
                                {row[8]}
                              </Status>
                            </StyledBodyCell>
                          </React.Fragment>
                        );
                      })
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
