import React from 'react'
import { Avatar, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const propsTranslate = { // Отображаемые данные
  student: 'Студент',
  teacher: 'Преподаватель',
  pulpit: 'Кафедра',
  grade_book: 'Зачетная книжка',
  group: 'Группа',
  course: 'Курс',
  gender: 'Пол'
}

const Profile = ({ role, first_name, last_name, patronymic, ...props }) => {
  const info = Object.keys(props)
    .filter(prop => prop in propsTranslate)
    .map((prop, i) => (
      <div key={i}>
        <span style={{ fontWeight: "500" }}>{propsTranslate[prop]}: </span>
        {props[prop]}
      </div>
    ))

  return (
    <Space direction="vertical" size="middle" style={{ padding: "20px", fontSize: "16px" }}>
      <Avatar size={128} icon={<UserOutlined />} />

      <div>
        <span style={{ fontWeight: "500" }}>ФИО: </span>
        {last_name} {first_name} {patronymic} ({propsTranslate[role.toLowerCase()]})
      </div>

      {info}
    </Space>
  )
}

export default Profile
