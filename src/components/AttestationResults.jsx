import { Space, Table, Tag, message } from 'antd'
import Text from 'antd/lib/typography/Text'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ratingColors from './../values/ratingColors'

const columns = [
  {
    title: 'Дисциплина',
    dataIndex: 'discipline',
    key: 'discipline'
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Преподаватель',
    dataIndex: 'teacher',
    key: 'teacher'
  },
  {
    title: 'Попытка',
    dataIndex: 'attempt',
    key: 'attempt'
  },
  {
    title: 'Оценка',
    dataIndex: 'score',
    key: 'score',
    ellipsis: true,
    render: score => (
      <Tag color={ratingColors[score]}>{score}</Tag>
    )
  }
]

const AttestationResults = () => {
  const studentId = useSelector(state => state.auth.id)
  const [results, setResults] = useState([])

  useEffect(() => {
    window.ipcRenderer.invoke('getAttestationResults', studentId)
      .then(res => setResults(res))
      .catch(() => message.error('Ошибка получения данных'))
  }, [studentId, setResults])

  return (
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      {
        results.map((item, i) => (
          <Table
            columns={columns}
            dataSource={item}
            title={() => (<Text strong style={{ fontSize: '16px' }}>{(i + 1) + ' семестр'}</Text>)}
            pagination={false}
            key={i}
            bordered={true}
          />
        ))
      }
    </Space>
  )
}

export default AttestationResults
