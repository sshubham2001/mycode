import React, { Suspense } from "react";
import { InLineLoader } from "../../Components/InlineLoader/InlineLoader";
import AdminLayout from "../../Layout/Layout";
import Orders from "../Orders/Orders";

const OrdersRoute = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<InLineLoader />}>
        <Orders />
      </Suspense>
    </AdminLayout>
  );
};

export default OrdersRoute;
