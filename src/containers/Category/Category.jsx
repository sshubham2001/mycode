import React, { useCallback, useState } from "react";
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
import Checkbox from "../../Components/CheckBox/CheckBox";
// import { useQuery, gql } from "@apollo/client";
import { Wrapper, Header, Heading } from "../../Components/Wrapper.style";
import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
  ImageWrapper,
} from "./Category.style";
import { Plus } from "../../assets/icons/Plus";
import * as icons from "../../assets/icons/category-icons";
import NoResult from "../../Components/NoResult/NoResult";

import { useDispatch, useSelector } from "react-redux";
import {
  activeCategoryProducts,
  inActiveCategoryProducts,
} from "../../store/actions/category";

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

const categorySelectOptions = [
  { value: "grocery", label: "Grocery" },
  { value: "women-cloths", label: "Women Cloth" },
  { value: "bags", label: "Bags" },
  { value: "makeup", label: "Makeup" },
];

const data = [
  {
    id: 1,
    icon: icons.Beverage,
    name: "Soft Drinks",
    slug: "soft-drinks",
    type: "Grocery",
  },
  {
    id: 1,
    icon: icons.Beverage,
    name: "Soft Drinks",
    slug: "soft-drinks",
    type: "Grocery",
  },
  {
    id: 1,
    icon: icons.Beverage,
    name: "Soft Drinks",
    slug: "soft-drinks",
    type: "Grocery",
  },
  {
    id: 1,
    icon: icons.Beverage,
    name: "Soft Drinks",
    slug: "soft-drinks",
    type: "Grocery",
  },
];

export default function Category() {
  const reduxDispatch = useDispatch();
  const stateCategory = useSelector((state) => state.dashboard.categories);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDrawerDispatch();
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);
  const [mainProduct, setMainProduct] = useState([]);
  const [cloneData, setCloneData] = useState([]);

  const openDrawer = useCallback(
    () => dispatch({ type: "OPEN_DRAWER", drawerComponent: "CATEGORY_FORM" }),
    [dispatch]
  );

  React.useEffect(() => {
    stateCategory && setCloneData(stateCategory);
    stateCategory && setMainProduct(stateCategory);
  }, [stateCategory]);

  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value);
  }

  function handleCategory({ value }) {
    setCategory(value);
  }

  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.categories.map((current) => current.id);
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
  const Icon = ({ name }) => {
    const TagName = icons[name];
    return !!TagName ? <TagName /> : <p>Invalid icon {name}</p>;
  };

  const filterByValue = (array, value) => {
    return array.filter(
      (data) =>
        JSON.stringify(data.title)
          ?.toLowerCase()
          .indexOf(value.toLowerCase()) !== -1
    );
  };

  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);
    const copyProduct = JSON.parse(JSON.stringify(mainProduct));
    setCloneData(filterByValue(copyProduct, value));
  }

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
              <Heading>Category</Heading>
            </Col>

            <Col md={10}>
              <Row>
                {/* <Col md={3} lg={3}>
                  <Select
                    options={categorySelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Category Type"
                    value={category}
                    searchable={false}
                    onChange={handleCategory}
                  />
                </Col> */}

                <Col md={5} lg={6}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={4} lg={3}>
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
                    Add Category
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(100px, 70px) minmax(90px, 70px) minmax(70px, 70px) minmax(150px, auto) minmax(150px, auto) auto">
                <StyledHeadCell>Status</StyledHeadCell>
                <StyledHeadCell>Id</StyledHeadCell>
                <StyledHeadCell>Image</StyledHeadCell>
                <StyledHeadCell>Name</StyledHeadCell>
                <StyledHeadCell>Product Active</StyledHeadCell>
                <StyledHeadCell>Product Inactive</StyledHeadCell>

                {cloneData ? (
                  cloneData.length ? (
                    cloneData.map((row, index) => (
                      <React.Fragment key={index}>
                        <StyledCell>
                          <b
                            style={{
                              color: row.isActive ? "#00BD87" : "#FF2511",
                            }}
                          >
                            {row.isActive ? "ACTIVE" : "INACTIVE"}
                          </b>
                        </StyledCell>
                        <StyledCell>{row._id.substring(0, 6)}</StyledCell>
                        <StyledCell>
                          <ImageWrapper>
                            <a id="myLink" href={row.media} target="_blank">
                              <img
                                src={row.media}
                                style={{ objectFit: "contain" }}
                              />
                            </a>
                          </ImageWrapper>
                        </StyledCell>
                        <StyledCell>{row.title}</StyledCell>
                        <StyledCell>
                          <a
                            onClick={() =>
                              reduxDispatch(activeCategoryProducts(row._id))
                            }
                          >
                            Set Active
                          </a>
                        </StyledCell>
                        <StyledCell>
                          <a
                            onClick={() =>
                              reduxDispatch(inActiveCategoryProducts(row._id))
                            }
                          >
                            Set InActive
                          </a>
                        </StyledCell>
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
