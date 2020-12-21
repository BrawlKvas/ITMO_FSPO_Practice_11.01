import React, { useEffect, useState } from 'react'
import { message, Table } from 'antd'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import withColumnSearchProps from './../../hoc/withColumnSearchProps'

const ExamHistory = ({ columnSearchProps }) => {

  const [exams, setExams] = useState([])
  const teacherId = useSelector((state) => state.auth.id)

  useEffect(() => {
    window.ipcRenderer.invoke('getExamHistory', teacherId)
      .then(res => setExams(res))
      .catch(() => message.error('Ошибка получения данных'))
  }, [teacherId])

  const columns = [
    {
      title: 'Дисциплина',
      dataIndex: 'discipline',
      key: 'discipline',
      ...columnSearchProps('discipline')
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      ...columnSearchProps('date')
    },
    {
      title: 'Семестр',
      dataIndex: 'semester',
      key: 'semester',
      sorter: (a, b) => a.semester - b.semester,
      ...columnSearchProps('semester')
    },
    {
      title: 'Группа',
      dataIndex: 'group',
      key: 'group',
      ...columnSearchProps('group')
    },
    {
      title: 'Кабинет',
      dataIndex: 'cabinet',
      key: 'cabinet',
      ...columnSearchProps('cabinet')
    },
    {
      title: 'Результаты',
      key: 'results',
      render: (_, row) => (<NavLink to={`/exam/${row.id}`}>Результаты</NavLink>)
    }
  ]

  return (
    <Table columns={columns} dataSource={exams} bordered />
  )
}

export default withColumnSearchProps(ExamHistory)