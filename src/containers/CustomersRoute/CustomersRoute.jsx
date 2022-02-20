import React, { Suspense } from "react";
import { InLineLoader } from "../../Components/InlineLoader/InlineLoader";
import AdminLayout from "../../Layout/Layout";
import Customers from "../Customers/Customers";

const CustomersRoute = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<InLineLoader />}>
        <Customers />
      </Suspense>
    </AdminLayout>
  );
};

export default CustomersRoute;
