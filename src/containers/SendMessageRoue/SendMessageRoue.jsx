import React, { Suspense } from "react";
import { InLineLoader } from "../../Components/InlineLoader/InlineLoader";
import AdminLayout from "../../Layout/Layout";
import SendMessageForm from "../SendMessageForm/SendMessageForm";

const SiteSettingRoute = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<InLineLoader />}>
        <SendMessageForm />
      </Suspense>
    </AdminLayout>
  );
};

export default SiteSettingRoute;
