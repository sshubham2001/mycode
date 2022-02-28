import axios from 'axios'
import { store } from 'react-notifications-component'
import { message as notify } from 'antd'

export const adminLogin = (userDetails, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/login`,
      userDetails,
      config
    )
    const {
      data: { siteId, status, message, access_token, data: adminDetails },
    } = res
    if (status) {
      notify.success(message)
      // store.addNotification({
      //   title: "Success!",
      // message: message,
      //   type: "success",
      //   insert: "top",
      //   container: "top-right",
      //   animationIn: ["animate__animated", "animate__fadeIn"],
      //   animationOut: ["animate__animated", "animate__fadeOut"],
      //   dismiss: {
      //     duration: 2000,
      //     onScreen: true,
      //   },
      // });

      // Fetching Required Items
      fetchItems()
      // End of Fetching function

      status && localStorage.setItem('token', access_token)
      status && localStorage.setItem('siteId', siteId)
      status && localStorage.setItem('isAuth', JSON.stringify(true))
      status && localStorage.setItem('admin', adminDetails?.role)
      status &&
        dispatch({
          type: 'ADMIN_DETAILS',
          payload: adminDetails,
        })
      history.push('/')
    } else {
      notify.error(message)
    }
  } catch (error) {
    console.log('🤞Hurray ERROR', error)
  }
}

export const updateSite = (siteDetails, history) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')
    console.log(token)
    const siteId = localStorage.getItem('siteId')
    console.log(siteId)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/update-site-settings`,
      { ...siteDetails, _id: siteId },
      config
    )
    const {
      data: { status, message },
    } = res
    if (status) {
      store.addNotification({
        title: 'Success!',
        message: message,
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      })
      status && history.push('/')
    } else {
      store.addNotification({
        title: 'Failed!',
        message: message,
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      })
    }
  } catch (error) {
    store.addNotification({
      title: 'Failed!',
      message: 'Session timedout. Please login again!',
      type: 'danger',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    })
    localStorage.removeItem('isAuth')
    localStorage.removeItem('token')
  }
}

export const fetchItems = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')
    console.log(token)
    const siteId = localStorage.getItem('siteId')
    console.log(siteId)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
    // Fetching Products
    const fetchProduct = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/public/fetch-product`,
      {},
      config
    )
    const {
      data: { status, data: products },
    } = fetchProduct
    if (status) {
      status &&
        dispatch({
          type: 'FETCH_PRODUCTS',
          payload: products,
        })
    } else {
      console.log('❌ Failed to fetch products')
    }

    // Fetching Categories
    const fetchCategory = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/public/fetch-category`,
      {},
      config
    )
    const {
      data: { status: status1, data: categories },
    } = fetchCategory
    if (status1) {
      dispatch({
        type: 'FETCH_CATEGORIES',
        payload: categories,
      })
    }

    // Fetching Coupons
    const fetchCoupon = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/public/fetch-coupon`,
      {},
      config
    )
    const {
      data: { status: status2, data: coupons },
    } = fetchCoupon
    if (status2) {
      dispatch({
        type: 'FETCH_COUPONS',
        payload: coupons,
      })
    }

    // Fetching Alerts
    const fetchAlert = await axios.get(
      `${process.env.REACT_APP_DATABASEURL}/public/fetch-new-alert`,
      config
    )
    const {
      data: { status: status3, data },
    } = fetchAlert
    // localStorage.setItem("oldOrder", data.orderId);
    status3 &&
      dispatch({
        type: 'FETCH_ALERT',
        payload: data,
      })
    // Fetching Alerts
    const fetchReport = await axios.get(
      `${process.env.REACT_APP_DATABASEURL}/admin/admin-reports`,
      config
    )
    const {
      data: { status: status4 },
    } = fetchReport
    status4 &&
      dispatch({
        type: 'ADMIN_REPORT',
        payload: fetchReport?.data,
      })

    // // Fetching Orders
    // const fetchOrder = await axios.post(
    //   `${process.env.REACT_APP_DATABASEURL}/admin/fetch-order`,
    //   {},
    //   config
    // );
    // const {
    //   data: { status: status3, data: orders },
    // } = fetchOrder;
    // if (status3) {
    //   dispatch({
    //     type: "FETCH_ORDERS",
    //     payload: orders,
    //   });
    // }
  } catch (error) {
    console.log('🤞Hurray ERROR', error)
  }
}

export const fetchNewNotification = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    // Fetching Alerts
    const fetchAlert = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/public/fetch-new-alert`,
      {},
      config
    )
    const {
      data: { status, data },
    } = fetchAlert
    console.log(fetchAlert)
    status &&
      dispatch({
        type: 'FETCH_ALERT',
        payload: data,
      })
  } catch (error) {
    console.log(error)
    store.addNotification({
      title: 'Error!',
      message: 'Failed to fetch new notification!',
      type: 'danger',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    })
  }
}

export const isLoggedIn = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    // Fetching Alerts
    const fetchData = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/isLoggedin`,
      { token },
      config
    )
    const {
      data: { status, data },
    } = fetchData
    console.log(fetchData)
    status &&
      dispatch({
        type: 'ADMIN_DETAILS',
        payload: data,
      })
    status && localStorage.setItem('admin', data?.role)
  } catch (error) {
    console.log(error)
    store.addNotification({
      title: 'Error!',
      message: 'Session timed out. Please login again!',
      type: 'danger',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    })
  }
}

// 600000
