import axios from 'axios'
import { store } from 'react-notifications-component'

export const addProduct = (productDetails) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')

    console.log(token)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/create-product`,
      productDetails,
      config
    )
    const {
      data: { status, message, data },
    } = res
    status &&
      dispatch({
        type: 'FETCH_PRODUCTS',
        payload: data,
      })
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
    console.log('🤞HurraY ERROR', error)
  }
}

export const updateProduct = (productDetails) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')
    console.log(token)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/update-product`,
      productDetails,
      config
    )
    const {
      data: { status, message, data },
    } = res
    status &&
      dispatch({
        type: 'FETCH_PRODUCTS',
        payload: data,
      })
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
    console.log('🤞HurraY ERROR', error)
  }
}
