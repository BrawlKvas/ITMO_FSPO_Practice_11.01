import React, { useEffect, useState } from 'react'
import { message, Table } from 'antd'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import useTabelSearch from '../common/useTabelSearch'

const ExamHistory = () => {

  const [exams, setExams] = useState([])
  const teacherId = useSelector((state) => state.auth.id)

  useEffect(() => {
    window.ipcRenderer.invoke('getExamHistory', teacherId)
      .then(res => setExams(res))
      .catch(() => message.error('Ошибка получения данных'))
  }, [teacherId])

  const getColumnSearchProps = useTabelSearch()

  const columns = [
    {
      title: 'Дисциплина',
      dataIndex: 'discipline',
      key: 'discipline',
      ...getColumnSearchProps('discipline')
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('date')
    },
    {
      title: 'Семестр',
      dataIndex: 'semester',
      key: 'semester',
      sorter: (a, b) => a.semester - b.semester,
      ...getColumnSearchProps('semester')
    },
    {
      title: 'Группа',
      dataIndex: 'group',
      key: 'group',
      ...getColumnSearchProps('group')
    },
    {
      title: 'Кабинет',
      dataIndex: 'cabinet',
      key: 'cabinet',
      ...getColumnSearchProps('cabinet')
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

export default ExamHistory