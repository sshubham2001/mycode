import React, { Suspense } from "react";
import { InLineLoader } from "../../Components/InlineLoader/InlineLoader";
import AdminLayout from "../../Layout/Layout";
import StaffMembers from "../StaffMembers/StaffMembers";

const StaffMembersRoute = () => {
  return (
    <>
      <AdminLayout>
        <Suspense fallback={<InLineLoader />}>
          <StaffMembers />
        </Suspense>
      </AdminLayout>
    </>
  );
};

export default StaffMembersRoute;
