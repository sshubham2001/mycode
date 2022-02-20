import React, { useState, useEffect } from "react";
import { styled, withStyle } from "baseui";
import Button from "../../Components/Button/Button";
import {
  Grid,
  Row as Rows,
  Col as Column,
} from "../../Components/FlexBox/FlexBox";
import Input from "../../Components/Input/Input";
import Select from "../../Components/Select/Select";
// import { useQuery, gql } from "@apollo/client";
import { Header, Heading } from "../../Components/Wrapper.style";
import Fade from "react-reveal/Fade";
import ProductCard from "../../Components/ProductCard/ProductCard";
import NoResult from "../../Components/NoResult/NoResult";
import { CURRENCY } from "../../settings/constants";
import Placeholder from "../../Components/Placeholder/Placeholder";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../../store/actions/auth";

export const ProductsRow = styled("div", ({ $theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginTop: "25px",
  backgroundColor: $theme.colors.backgroundF7,
  position: "relative",
  zIndex: "1",

  "@media only screen and (max-width: 767px)": {
    marginLeft: "-7.5px",
    marginRight: "-7.5px",
    marginTop: "15px",
  },
}));

export const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  "@media only screen and (min-width: 768px) and (max-width: 991px)": {
    alignItems: "center",
  },
}));

export const ProductCardWrapper = styled("div", () => ({
  height: "100%",
}));

export const LoaderWrapper = styled("div", () => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexWrap: "wrap",
}));

export const LoaderItem = styled("div", () => ({
  width: "25%",
  padding: "0 15px",
  marginBottom: "30px",
}));

const typeSelectOptions = [
  { value: "grocery", label: "Grocery" },
  { value: "women-cloths", label: "Women Cloths" },
  { value: "bags", label: "Bags" },
  { value: "makeup", label: "Makeup" },
];
const priceSelectOptions = [
  { value: "highestToLowest", label: "Highest To Lowest", type: 0 },
  { value: "lowestToHighest", label: "Lowest To Highest", type: 1 },
];

export default function Products() {
  const reduxDispatch = useDispatch();
  const products = useSelector((state) => state.dashboard.products);
  const fetchCategories = useSelector((state) => state.dashboard.categories);

  const [loadingMore, toggleLoading] = useState(false);
  const [type, setType] = useState([]);
  const [priceOrder, setPriceOrder] = useState([]);
  const [search, setSearch] = useState([]);
  const [mainProduct, setMainProduct] = useState([]);
  const [cloneData, setCloneData] = useState([]);
  const [category, setCategory] = useState(null);
  const [visible, setVisible] = useState(12);

  useEffect(() => {
    products && setCloneData(products);
    products && setMainProduct(products);
  }, [products]);

  let options = fetchCategories.map((ele) => {
    return { value: ele.title, id: ele._id, name: ele.title };
  });

  function loadMore() {
    toggleLoading(true);
  }

  const data = [
    {
      name: "Maggie Noodles",
      unit: "500g",
      image: `${require("../../assets/image/maggi_chicken.jpg").default}`,
      price: 30,
      salePrice: 25,
      discountInPercent: 3,
    },
  ];

  const handleLoadMore = () => {
    setVisible((prevValue) => prevValue + 12);
  };

  function handlePriceSort({ value }) {
    setPriceOrder(value);
    if ((value.type = 1)) {
      mainProduct.sort((a, b) => {
        return parseFloat(b.price) - parseFloat(a.price);
      });
    } else if ((value.type = 0)) {
      mainProduct.sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price);
      });
    }

    // if (priceOrder[0].value == "highestToLowest") {
    //   mainProduct.sort((a, b) => {
    //     return a.price - b.price;
    //   });
    // }
    // console.log(mainProduct);
    // console.log(value.length);
    // if (value.length) {
    // }
    // if (value.length) {
    //   //   refetch({
    //   //     sortByPrice: value[0].value,
    //   //   });
    // } else {
    //   //   refetch({
    //   //     sortByPrice: null,
    //   //   });
    // }
  }

  const handleMultiChange = ({ value }) => {
    setCategory(value);
    console.log(value);
    if (value.length) {
      let filterByCategory = mainProduct.filter((item) => {
        return item.category?.title === value[0]?.value;
      });
      setCloneData(filterByCategory);
    } else {
      setCloneData(mainProduct);
    }
  };

  function handleCategoryType({ value }) {
    setType(value);
    if (value.length) {
      //   refetch({
      //     type: value[0].value,
      //   });
    } else {
      //   refetch({
      //     type: null,
      //   });
    }
  }

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
          <Header style={{ marginBottom: 15 }}>
            <Col md={2} xs={12}>
              <Heading>Products</Heading>
            </Col>

            <Col md={10} xs={12}>
              <Row>
                <Col md={3} xs={12}>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Category"
                    value={category}
                    searchable={false}
                    onChange={handleMultiChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      SingleValue: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                  />
                </Col>

                <Col md={3} xs={12}>
                  <Select
                    options={priceSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    value={priceOrder}
                    placeholder="Price"
                    searchable={false}
                    onChange={handlePriceSort}
                  />
                </Col>

                <Col md={6} xs={12}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>
              </Row>
            </Col>
          </Header>

          <Row>
            {cloneData ? (
              cloneData && cloneData.length !== 0 ? (
                cloneData?.slice(0, visible).map((item, index) => (
                  <Col
                    md={4}
                    lg={3}
                    sm={6}
                    xs={12}
                    key={index}
                    style={{ margin: "15px 0" }}
                  >
                    <Fade bottom duration={800} delay={index * 10}>
                      <ProductCard
                        id={item._id}
                        description={item.description}
                        title={item.title}
                        category={item.category.title}
                        quantity={item.unit}
                        image={item.media[0]}
                        currency={"₹"}
                        price={item.price}
                        salePrice={item.salePrice}
                        discountInPercent={item.discount}
                        data={item}
                      />
                    </Fade>
                  </Col>
                ))
              ) : (
                <NoResult />
              )
            ) : (
              <LoaderWrapper>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
              </LoaderWrapper>
            )}
          </Row>

          <Row>
            <Col md={12} style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={handleLoadMore} isLoading={loadingMore}>
                Load More
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
  );
}
