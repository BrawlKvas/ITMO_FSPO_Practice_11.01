import { Typography, Space } from 'antd'
import React from 'react'

const { Text } = Typography

const InfoApp = () => {
  return (
    <Space direction="vertical">
      <Text mark>Организация "Название организации"</Text>
      <Text strong>Разработчик: Пукки Константин Андреевич</Text>
      <Text strong>Техническая поддержка: gachi@gmail.com</Text>
    </Space>
  )
}

export default InfoApp
