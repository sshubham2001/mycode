import React, { Suspense } from "react";
import { InLineLoader } from "../../Components/InlineLoader/InlineLoader";
import AdminLayout from "../../Layout/Layout";
import Category from "../Category/Category";

const CategoryRoute = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<InLineLoader />}>
        <Category />
      </Suspense>
    </AdminLayout>
  );
};

export default CategoryRoute;
