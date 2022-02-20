import React from "react";
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  SaleTag,
  DiscountPercent,
  Image,
  ProductTitle,
  ProductWeight,
  ProductMeta,
  OrderID,
  ProductPriceWrapper,
  ProductPrice,
  DiscountedPrice,
} from "./ProductCard.style";
import { useDrawerDispatch } from "../../context/DrawerContext";
import { useDispatch } from "react-redux";

// type ProductCardProps = {
//   title: string,
//   image: any,
//   weight?: string,
//   currency?: string,
//   description?: string,
//   price: number,
//   salePrice?: number,
//   orderId?: number,
//   discountInPercent?: number,
//   data: any,
// };

const ProductCard = ({
  id,
  title,
  image,
  weight,
  price,
  salePrice,
  discountInPercent,
  currency,
  data,
  orderId,
  quantity,
  category,
  description,
  ...props
}) => {
  const dispatch = useDrawerDispatch();
  const reduxDispatch = useDispatch();
  // const openDrawer = React.useCallback(
  //   () =>
  //     dispatch({
  //       type: "OPEN_DRAWER",
  //       drawerComponent: "PRODUCT_UPDATE_FORM",
  //       data: data,
  //     }),
  //   reduxDispatch({ type: "SINGLE_PRODUCT", payload: productData })[
  //     (dispatch, data)
  //   ]
  // );
  const testFun = (test) => {
    reduxDispatch({
      type: "SINGLE_PRODUCT",
      payload: {
        id,
        title,
        image,
        price,
        salePrice,
        discountInPercent,
        description,
        currency,
        quantity,
        category,
      },
    });
    dispatch({
      type: "OPEN_DRAWER",
      drawerComponent: "PRODUCT_UPDATE_FORM",
      data: data,
    });
  };
  return (
    <ProductCardWrapper
      {...props}
      className="product-card"
      // onClick={openDrawer}
      onClick={() =>
        testFun(
          title,
          image,
          price,
          salePrice,
          discountInPercent,
          description,
          currency,
          quantity,
          category
        )
      }
    >
      <ProductImageWrapper>
        <Image url={image} className="product-image" />
        {discountInPercent && discountInPercent !== 0 ? (
          <>
            <SaleTag>Sale</SaleTag>
            <DiscountPercent>{discountInPercent}% Off</DiscountPercent>
          </>
        ) : null}
      </ProductImageWrapper>
      <ProductInfo>
        <ProductTitle>{title}</ProductTitle>
        <ProductWeight>Category: {category}</ProductWeight>
        <br />
        <ProductWeight>Quantity: {quantity}</ProductWeight>
        <ProductMeta>
          <ProductPriceWrapper>
            <ProductPrice>
              {currency}
              {salePrice && salePrice !== 0 ? salePrice : price}
            </ProductPrice>

            {discountInPercent && discountInPercent !== 0 ? (
              <DiscountedPrice>
                {currency}
                {price}
              </DiscountedPrice>
            ) : null}
          </ProductPriceWrapper>

          <OrderID>{orderId}</OrderID>
        </ProductMeta>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
