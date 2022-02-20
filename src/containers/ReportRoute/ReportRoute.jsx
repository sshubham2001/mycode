import React, { Suspense } from "react";
import { InLineLoader } from "../../Components/InlineLoader/InlineLoader";
import AdminLayout from "../../Layout/Layout";
import Reports from "../Reports/Reports";

const ProductRoute = () => {
  return (
    <>
      <AdminLayout>
        <Suspense fallback={<InLineLoader />}>
          <Reports />
        </Suspense>
      </AdminLayout>
    </>
  );
};

export default ProductRoute;
