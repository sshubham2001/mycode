import React, { useState, useEffect } from "react";
import { Button, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { generateMontlyReport } from "../../store/actions/admin";

const { RangePicker } = DatePicker;

const Reports = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.dashboard.loading);
  const monthlyReport = useSelector((state) => state.dashboard.monthlyReport);
  const [date, setDate] = useState([]);
  const [report, setReport] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    monthlyReport && setReport(monthlyReport);
  }, [monthlyReport]);

  const headers = [
    { label: "TOTAL DELIVERY COUNT", key: "totalDelivery" },
    { label: "TOTAL CANCEL COUNT", key: "totalCancel" },
    { label: "TOTAL REVENUE", key: "totalRevenue" },
    { label: "NEW PRODUCTS", key: "newProducts" },
    { label: "NEW CATEGORY", key: "newCategory" },
    { label: "NEW USERS", key: "newUsers" },
    { label: "NEW SUBSCRIBERS", key: "newSubscribers" },
  ];

  const data = [
    {
      totalDelivery: monthlyReport?.total_delivery,
      totalCancel: monthlyReport?.total_cancel,
      totalRevenue: monthlyReport?.total_delivered,
      newProducts: monthlyReport?.new_products,
      newCategory: monthlyReport?.new_category,
      newUsers: monthlyReport?.new_users,
      newSubscribers: monthlyReport?.new_subscriber,
    },
  ];

  const generateReport = () => {
    setError(false);
    if (!date.length) {
      return setError(true);
    } else {
      dispatch({ type: "START_LOADER" });
      dispatch(generateMontlyReport(date));
    }
  };

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>Choose months to generate reports.</p>
      <RangePicker onChange={(date, string) => setDate(string)} />
      <br />
      <Button
        loading={loading}
        onClick={generateReport}
        style={{ background: "#00C58D", color: "#fff", marginTop: 16 }}
      >
        Generate Report
      </Button>
      <br />
      {error && (
        <em style={{ color: "red" }}>Please mark start and end dates!</em>
      )}
      {Object.keys(report).length > 0 ? (
        <>
          <br />
          <CSVLink data={data} headers={headers}>
            <i class="bi bi-download" style={{ marginRight: 8 }}></i>Download
            Report
          </CSVLink>
        </>
      ) : null}
    </div>
  );
};

export default Reports;
