import React, { Suspense } from "react";
import { InLineLoader } from "../../Components/InlineLoader/InlineLoader";
import AdminLayout from "../../Layout/Layout";
import Products from "../Products/Products";

const ProductRoute = () => {
  return (
    <>
      <AdminLayout>
        <Suspense fallback={<InLineLoader />}>
          <Products />
        </Suspense>
      </AdminLayout>
    </>
  );
};

export default ProductRoute;
