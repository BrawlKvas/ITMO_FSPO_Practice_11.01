import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import Profile from './Profile'

const ProfileContainer = ({ userId, role }) => {
  const [state, setState] = useState(null)

  useEffect(() => {
    (async function () {
      try {
        const res = await window.ipcRenderer.invoke('getInfoAboutMe', { userId, role })
        setState(res)
      } catch (error) {
        message.error('Ошибка получения данных')
      }
    })()

  }, [userId, role])

  if (!state)
    return <div>Loading</div>

  return (
    <Profile {...state} role={role} />
  )
}

export default connect((state) => ({
  userId: state.auth.userId,
  role: state.auth.role
}), null)(ProfileContainer)
