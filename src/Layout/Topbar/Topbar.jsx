import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../Components/Button/Button";
import Popover, { PLACEMENT } from "../../Components/Popover/Popover";
import Notification from "../../Components/Notification/Notification";

// import { AuthContext } from 'context/auth'; // AUTH STATE

import { STAFF_MEMBERS, SETTINGS } from "../../settings/constants";

import { NotificationIcon } from "../../assets/icons/NotificationIcon";
import { AlertDotIcon } from "../../assets/icons/AlertDotIcon";
import { ArrowLeftRound } from "../../assets/icons/ArrowLeftRound";
import { MenuIcon } from "../../assets/icons/MenuIcon";

import {
  TopbarWrapper,
  Logo,
  LogoImage,
  TopbarRightSide,
  ProfileImg,
  Image,
  AlertDot,
  NotificationIconWrapper,
  UserDropdowItem,
  NavLink,
  LogoutBtn,
  DrawerIcon,
  CloseButton,
  DrawerWrapper,
} from "./Topbar.style";
import Avatar from "react-avatar";
import Logoimage from "../../assets/image/PickBazar.png";
import UserImage from "../../assets/image/user.jpg";

import { useDrawerDispatch } from "../../context/DrawerContext"; // Drawer State
import Drawer, { ANCHOR } from "../../Components/Drawer/Drawer";
import Sidebar from "../Sidebar/Sidebar";

const data = [
  {
    title: "Delivery Successful",
    time: "5m",
    message: "Order #34567 had been placed",
  },
];

const Topbar = ({ refs }) => {
  const dispatch = useDrawerDispatch();
  const stateDispatch = useDispatch();
  const history = useHistory();
  const admin = useSelector((state) => state.user.admin);
  // const { signout } = React.useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = useCallback(
    () => dispatch({ type: "OPEN_DRAWER", drawerComponent: "PRODUCT_FORM" }),
    [dispatch]
  );

  return (
    <TopbarWrapper ref={refs}>
      <Logo>
        <Link to="/">
          <LogoImage
            src={require("../../assets/image/logo.png").default}
            alt="pickbazar-admin"
          />
        </Link>
      </Logo>

      <DrawerWrapper>
        <DrawerIcon onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon />
        </DrawerIcon>
        <Drawer
          isOpen={isDrawerOpen}
          anchor={ANCHOR.left}
          onClose={() => setIsDrawerOpen(false)}
          overrides={{
            Root: {
              style: {
                zIndex: "1",
              },
            },
            DrawerBody: {
              style: {
                marginRight: "0",
                marginLeft: "0",
                "@media only screen and (max-width: 767px)": {
                  marginLeft: "30px",
                },
              },
            },
            DrawerContainer: {
              style: {
                width: "270px",
                "@media only screen and (max-width: 767px)": {
                  width: "80%",
                },
              },
            },
            Close: {
              component: () => (
                <CloseButton onClick={() => setIsDrawerOpen(false)}>
                  <ArrowLeftRound />
                </CloseButton>
              ),
            },
          }}
        >
          <Sidebar onMenuItemClick={() => setIsDrawerOpen(false)} />
        </Drawer>
      </DrawerWrapper>

      <TopbarRightSide>
        <Button onClick={openDrawer}>Add Products</Button>

        <Popover
          content={({ close }) => <Notification data={data} onClear={close} />}
          accessibilityType={"tooltip"}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: {
                width: "330px",
                zIndex: 2,
              },
            },
            Inner: {
              style: {
                backgroundColor: "#ffffff",
              },
            },
          }}
        >
          <NotificationIconWrapper>
            <NotificationIcon />
            <AlertDot>
              <AlertDotIcon />
            </AlertDot>
          </NotificationIconWrapper>
        </Popover>

        <Popover
          content={({ close }) => (
            <UserDropdowItem>
              <NavLink
                style={{ color: "rgb(102, 109, 146)" }}
                to={STAFF_MEMBERS}
                exact={false}
                onClick={close}
              >
                Staff
              </NavLink>
              <NavLink
                style={{ color: "rgb(102, 109, 146)" }}
                to={SETTINGS}
                exact={false}
                onClick={close}
              >
                Settings
              </NavLink>
              <LogoutBtn
                style={{ color: "rgb(102, 109, 146)" }}
                onClick={() => {
                  stateDispatch({ type: "ADMIN_LOGOUT" });
                  localStorage.removeItem("token");
                  localStorage.removeItem("isAuth");
                  localStorage.removeItem("siteId");
                  history.push("/login");
                  close();
                }}
              >
                Logout
              </LogoutBtn>
            </UserDropdowItem>
          )}
          accessibilityType={"tooltip"}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: () => ({
                width: "220px",
                zIndex: 2,
              }),
            },
            Inner: {
              style: {
                backgroundColor: "#ffffff",
              },
            },
          }}
        >
          <ProfileImg>
            {/* <Image src={UserImage} alt="user" /> */}
            <Avatar name={admin?.name} size="42" />
          </ProfileImg>
        </Popover>
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default Topbar;
