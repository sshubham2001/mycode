import React, { Suspense } from "react";
import { InLineLoader } from "../../Components/InlineLoader/InlineLoader";
import AdminLayout from "../../Layout/Layout";
import Coupons from "../Coupons/Coupons";

const CouponsRoute = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<InLineLoader />}>
        <Coupons />
      </Suspense>
    </AdminLayout>
  );
};

export default CouponsRoute;
