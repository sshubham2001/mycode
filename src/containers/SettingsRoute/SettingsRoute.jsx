import React, { Suspense } from "react";
import { InLineLoader } from "../../Components/InlineLoader/InlineLoader";
import AdminLayout from "../../Layout/Layout";
import Settings from "../Settings/Settings";

const SettingsRoute = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<InLineLoader />}>
        <Settings />
      </Suspense>
    </AdminLayout>
  );
};

export default SettingsRoute;
