import React, { Suspense } from "react";
import { InLineLoader } from "../../Components/InlineLoader/InlineLoader";
import AdminLayout from "../../Layout/Layout";
import Dashboard from "../Dashboard/Dashboard";

const DashboardRoute = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<InLineLoader />}>
        <Dashboard />
      </Suspense>
    </AdminLayout>
  );
};

export default DashboardRoute;
