import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  SidebarWrapper,
  NavLink,
  MenuWrapper,
  Svg,
  LogoutBtn,
} from "./Sidebar.style";
import { useDispatch, useSelector } from "react-redux";
import {
  DASHBOARD,
  PRODUCTS,
  CATEGORY,
  ORDERS,
  CUSTOMERS,
  COUPONS,
  SETTINGS,
  REPORT,
} from "../../settings/constants";
import { useHistory } from "react-router";
// import { AuthContext } from 'context/auth'; // FOR AUTH STATE

import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { ProductIcon } from "../../assets/icons/ProductIcon";
import { SidebarCategoryIcon } from "../../assets/icons/SidebarCategoryIcon";
import { OrderIcon } from "../../assets/icons/OrderIcon";
import { CustomerIcon } from "../../assets/icons/CustomerIcon";
import { CouponIcon } from "../../assets/icons/CouponIcon";
import { SettingIcon } from "../../assets/icons/SettingIcon";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import { HelpIcon } from "../../assets/icons/HelpIcon";

const sidebarMenus = [
  {
    name: "Dashboard",
    path: DASHBOARD,
    exact: true,
    icon: <DashboardIcon />,
  },
  {
    name: "Products",
    path: PRODUCTS,
    exact: false,
    icon: <ProductIcon />,
  },
  {
    name: "Category",
    path: CATEGORY,
    exact: false,
    icon: <SidebarCategoryIcon />,
  },
  {
    name: "Orders",
    path: ORDERS,
    exact: false,
    icon: <OrderIcon />,
  },
  {
    name: "Customers",
    path: CUSTOMERS,
    exact: false,
    icon: <CustomerIcon />,
  },
  {
    name: "Coupons",
    path: COUPONS,
    exact: false,
    icon: <CouponIcon />,
  },
  {
    name: "Settings",
    path: SETTINGS,
    exact: false,
    icon: <SettingIcon />,
  },
  {
    name: "Monthly Report",
    path: REPORT,
    exact: false,
    icon: <HelpIcon />,
  },
];

const deliveryMenu = [
  {
    name: "Orders",
    path: ORDERS,
    exact: false,
    icon: <OrderIcon />,
  },
];

export default withRouter(function Sidebar({ refs, style, onMenuItemClick }) {
  const reduxDispatch = useDispatch();
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(true);
  const admin = useSelector((state) => state.user.admin);
  const adminType = localStorage.getItem("admin");
  useEffect(() => {
    adminType && adminType === "Super Admin"
      ? setIsAdmin(true)
      : admin.role === "System Admin"
      ? setIsAdmin(true)
      : setIsAdmin(false);
  }, [adminType]);

  // const { signout } = useContext(AuthContext);
  return (
    <SidebarWrapper ref={refs} style={style}>
      <MenuWrapper>
        {isAdmin
          ? sidebarMenus.map((menu, index) => (
              <NavLink
                to={menu.path}
                key={index}
                exact={menu.exact}
                activeStyle={{
                  color: "#00C58D",
                  backgroundColor: "#f7f7f7",
                  borderRadius: "50px 0 0 50px",
                }}
                onClick={onMenuItemClick}
              >
                {menu.icon ? <Svg>{menu.icon}</Svg> : ""}
                {menu.name}
              </NavLink>
            ))
          : deliveryMenu.map((menu, index) => (
              <NavLink
                to={menu.path}
                key={index}
                exact={menu.exact}
                activeStyle={{
                  color: "#00C58D",
                  backgroundColor: "#f7f7f7",
                  borderRadius: "50px 0 0 50px",
                }}
                onClick={onMenuItemClick}
              >
                {menu.icon ? <Svg>{menu.icon}</Svg> : ""}
                {menu.name}
              </NavLink>
            ))}
      </MenuWrapper>
      <hr />
      <LogoutBtn
        onClick={() => {
          reduxDispatch({ type: "ADMIN_LOGOUT" });
          localStorage.removeItem("token");
          localStorage.removeItem("isAuth");
          localStorage.removeItem("siteId");
          localStorage.removeItem("admin");
          history.push("/login");
        }}
      >
        <Svg>
          <LogoutIcon />
        </Svg>
        Logout
      </LogoutBtn>
    </SidebarWrapper>
  );
});
