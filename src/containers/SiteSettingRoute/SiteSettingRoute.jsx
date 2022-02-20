import React, { Suspense } from "react";
import { InLineLoader } from "../../Components/InlineLoader/InlineLoader";
import AdminLayout from "../../Layout/Layout";
import SiteSettingForm from "../SiteSettingForm/SiteSettingForm";

const SiteSettingRoute = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<InLineLoader />}>
        <SiteSettingForm />
      </Suspense>
    </AdminLayout>
  );
};

export default SiteSettingRoute;
