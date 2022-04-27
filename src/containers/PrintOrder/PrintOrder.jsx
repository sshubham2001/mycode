import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";

import "./PrintOrder.style.css";

const PrintOrder = () => {
  const history = useHistory();
  const order = useSelector((state) => state.dashboard.viewOrder);
  const storeDetails = useSelector((state) => state.dashboard.store);

  return (
    <div>
      <button
        onClick={() => window.print()}
        id="btnPrint"
        className="hidden-print printButton"
      >
        Print <i class="bi bi-printer-fill"></i>
      </button>
      <button
        onClick={() => history.push(`/view-order/${order && order._id}`)}
        id="btnPrint"
        className="hidden-print printButton"
      >
        Go Back <i class="bi bi-arrow-left-circle-fill"></i>
      </button>
      <div className="ticket">
        <p
          className="centered makebold"
          style={{ textTransform: "uppercase", paddingTop: 5 }}
        >
          {storeDetails?.title}
        </p>
        <p className="centered">{storeDetails?.address}</p>
        <p className="centered">
          {order.user?.name}
          <br />
          {order.shippingAddress?.number}
          <br />
          {order.shippingAddress?.address}
          <br />
          {order.shippingAddress?.pinCode}
          <br />
          {order.shippingAddress?.landmark && (
            <>
              <p>Notes: {order.shippingAddress?.landmark}</p>
            </>
          )}
          <small>{dayjs(order.date).format("DD-MM-YYYY hh:mm A")}</small>
        </p>
        {/* <div style={{ marginBottom: "1px solid #000" }}></div> */}
        <table>
          <thead className="tablehead">
            <tr className="tablehead tablebottom">
              <th className="quantity tablehead">Qty.</th>
              <th className="description tablehead">Product</th>
              <th className="price tablehead">₹₹</th>
            </tr>
          </thead>
          <tbody>
            {order?.product?.map((ele, i) => {
              return (
                <tr class="calc-row">
                  <td className="quantity">{ele.quantity}</td>
                  <td className="description">{ele.title}</td>
                  <td className="price">{ele.price * ele?.quantity}.00</td>
                </tr>
              );
            })}
            <tr class="calc-row tablehead">
              <td colspan="2">Packing Charge</td>
              <td>{order.packingCharge?.toFixed(2)}</td>
            </tr>
            <tr class="calc-row">
              <td colspan="2">Delivery Charge</td>
              <td>{order.deliveryCharge?.toFixed(2)}</td>
            </tr>
            <tr class="calc-row">
              <td colspan="2">Discount</td>
              <td>-{order.discount?.toFixed(2)}</td>
            </tr>
            <tr class="calc-row tablehead">
              <td colspan="2">Total</td>
              <td>
                <b>{order.total?.toFixed(2)}</b>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <p className="centered">Thanks for your purchase ❤</p>
        <p className="centered">Visit: {storeDetails?.link}</p>
      </div>
    </div>
  );
};

export default PrintOrder;
