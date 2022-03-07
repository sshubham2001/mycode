import axios from 'axios'
import { message as notify } from 'antd'

export const generateMontlyReport = (dates, history) => async (dispatch) => {
  try {
    const token = localStorage && localStorage.getItem('token')
    console.log(token)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }

    const res = await axios.post(
      `${process.env.REACT_APP_DATABASEURL}/admin/generate-report`,
      { dateOne: dates[0], dateTwo: dates[1] },
      config
    )
    res.statusText && dispatch({ type: 'STOP_LOADER' })
    const {
      data: { status, message, data },
    } = res
    status &&
      dispatch({
        type: 'FETCH_MONTHLY_REPORT',
        payload: data,
      })
    if (status) {
      notify.success(message)
    } else {
      notify.error(message)
    }
  } catch (error) {
    console.log('🤞HurraY ERROR', error)
  }
}