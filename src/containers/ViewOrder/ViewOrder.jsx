import React, { useState } from "react";
import "./ViewOrder.style.css";
import Select from "../../Components/Select/Select";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSingleOrder, updateOrder } from "../../store/actions/order";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ViewOrder = () => {
  let { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [orderStatus, setOrderStatus] = useState([]);
  const order = useSelector((state) => state.dashboard.viewOrder);
  const storeDetails = useSelector((state) => state.dashboard.store);

  const orderStatusOptions = storeDetails?.ownDelivery
    ? [
        { value: "Received", label: "Received" },
        { value: "Confirmed", label: "Confirmed" },
        { value: "Dispatched", label: "Dispatched" },
        { value: "Delivered", label: "Delivered" },
        { value: "Cancelled", label: "Cancel Order" },
      ]
    : [
        { value: "Received", label: "Received" },
        { value: "Confirmed", label: "Confirmed" },
        { value: "Dunzo Booked", label: "Book Dunzo" },
        { value: "Dispatched", label: "Dispatched" },
        { value: "Delivered", label: "Delivered" },
        { value: "Cancelled", label: "Cancel Order" },
        { value: "Dunzo Cancelled", label: "Cancel Dunzo" },
      ];

  let orderData = { orderID: id };

  useEffect(() => {
    dispatch(fetchSingleOrder(orderData));
  }, [id]);
  const handleUpdateOrderStatus = ({ value }) => {
    setOrderStatus(value);
    const data = {
      _id: id,
      status: value[0]?.value,
    };
    dispatch(updateOrder(data, history));
    setOrderStatus([]);
  };

  return (
    <div>
      <div className="invoice-card">
        <Select
          options={orderStatusOptions}
          labelKey="label"
          valueKey="value"
          placeholder="Status"
          value={orderStatus}
          searchable={false}
          onChange={handleUpdateOrderStatus}
        />
        <a
          onClick={() => history.push(`/print-order/${order._id}`)}
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          PRINT BILL <i class="bi bi-printer-fill"></i>
        </a>
        <div className="invoice-title">
          <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
            {storeDetails?.title}
          </h2>
          {/* <p style={{ textAlign: "center" }}>{storeDetails?.address}</p> */}
          <div id="main-title">
            <h4>ORDER DETAILS</h4>
            <div classNameName="user-details">
              <span>{order.shippingAddress?.name}</span>
              <br />
              <span>{order.shippingAddress?.number}</span>
              <br />
              <span>{order.shippingAddress?.address}</span>
              <br />
              <span>{order.shippingAddress?.pinCode}</span>
              <br />
              {order.shippingAddress?.landmark && (
                <>
                  <span>Notes: {order.shippingAddress?.landmark}</span>
                  <br />
                </>
              )}
              <a
                target="_blank"
                href={`https://www.google.com/maps/search/${order.shippingAddress?.geoLocation?.latitude},${order.shippingAddress?.geoLocation?.longitude}?sa=X&ved=2ahUKEwjT38CnoNryAhXJdCsKHX2jDxwQ8gF6BAgCEAE`}
              >
                <i class="bi bi-geo-alt"></i> Get Directions {">>"}
              </a>
              <br />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span id="date">
              {dayjs(order.date).format("DD-MM-YYYY hh:mm A")}
            </span>
            <span id="date">Payment: {order?.payment}</span>
          </div>
        </div>

        <div className="invoice-details">
          <table className="invoice-table">
            <thead>
              <tr>
                <td>PRODUCT</td>
                <td>UNIT</td>
                <td>PRICE</td>
              </tr>
            </thead>

            <tbody>
              {order?.product?.map((ele, i) => {
                return (
                  <tr className="row-data">
                    <td>
                      {ele.title} <span>({ele.category?.title})</span>
                    </td>
                    <td id="unit">{ele.quantity}</td>
                    <td>{ele.price * ele?.quantity}.00</td>
                  </tr>
                );
              })}
              <tr className="calc-row">
                <td colspan="2">Packing Charge</td>
                <td>₹ {order.packingCharge?.toFixed(2)}</td>
              </tr>
              <tr className="calc-row">
                <td colspan="2">Delivery Charge</td>
                <td>₹ {order.deliveryCharge?.toFixed(2)}</td>
              </tr>
              <tr className="calc-row">
                <td colspan="2">Discount</td>
                <td>₹ -{order.discount?.toFixed(2)}</td>
              </tr>
              <tr className="calc-row">
                <td colspan="2">Total</td>
                <td>
                  <b>₹ {order.total?.toFixed(2)}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="invoice-footer">
          <p className="btn btn-secondary" id="later">
            Current Status: <b>{order.status}</b>
          </p>
          <p
            onClick={() => history.push("/orders")}
            className="btn btn-primary"
          >
            Go back
          </p>
        </div>
        {/* <code style={{ textAlign: "center" }}>
          Thanks for ordering from us ❤
        </code> */}
      </div>
    </div>
  );
};

export default ViewOrder;
