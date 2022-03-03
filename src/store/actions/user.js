import axios from 'axios'
import { message as notify } from 'antd'

export const viewOrder = (order) => async (dispatch) => {
  dispatch({
    type: 'VIEW_ORDER',
    payload: order,
  })
}

export const fetchUser = (history) => async (dispatch) => {
  try {
    const token = localStorage && localStorage.getItem('token')
    console.log(token)

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }

    // Fetching Orders
    const fetchUser = await axios.get(
      `${process.env.REACT_APP_DATABASEURL}/admin/admin-fetch-users`,
      config
    )
    const {
      data: { status: status, users, message },
    } = fetchUser
    // console.log(orders);
    if (status) {
      dispatch({
        type: 'FETCH_USERS',
        payload: users,
      })
    }
    !status && notify.error(message)

    !status && localStorage.removeItem('token')
    !status && localStorage.removeItem('isAuth')
    !status && history.push('/login')
  } catch (error) {
    console.log(error)
    // localStorage.removeItem("token");
    // localStorage.removeItem("isAuth");
    // store.addNotification({
    //   title: "Failed!",
    //   message: "Session timed out. Please login again!",
    //   type: "danger",
    //   insert: "top",
    //   container: "top-right",
    //   animationIn: ["animate__animated", "animate__fadeIn"],
    //   animationOut: ["animate__animated", "animate__fadeOut"],
    //   dismiss: {
    //     duration: 2000,
    //     onScreen: true,
    //   },
    // });
    // window.location.reload();
  }
}
