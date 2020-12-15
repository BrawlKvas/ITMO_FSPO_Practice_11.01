import React from 'react'
import { useHistory } from 'react-router-dom'
import { Select, Table, Button, Space, message } from 'antd'
import AddStudent from './AddStudent'
import {
  setExamScore,
  setExamAttempt,
  removeExamStudent,
  saveExam
} from '../../../redux/examReducer'

import {
  DeleteOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'

const { Option } = Select

const TableCreateExam = ({ data, setExamScore, setExamAttempt, removeExamStudent, saveExam }) => {
  const history = useHistory()

  const columns = [
    {
      title: 'ФИО',
      dataIndex: 'fullname',
      key: 'fullname'
    },
    {
      title: 'Группа',
      dataIndex: 'group',
      key: 'group'
    },
    {
      title: 'Попытка',
      dataIndex: 'attempt',
      key: 'attempt',
      render: (value, student) => (
        <Select value={value} onChange={(newValue) => setExamAttempt(student.id, newValue)} >
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
        </Select>
      )
    },
    {
      title: 'Оценка',
      dataIndex: 'score',
      key: 'score',
      render: (value, student) => (
        <Select value={value} onChange={(newValue) => setExamScore(student.id, newValue)} >
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
          <Option value={4}>4</Option>
          <Option value={5}>5</Option>
        </Select>
      )
    },
    {
      title: 'Удалить',
      key: 'delete',
      render: (_, student) => (<Button onClick={() => removeExamStudent(student.id)}><DeleteOutlined /></Button>)
    }
  ]

  const onFinish = () => {
    saveExam()
      .then(() => {
        history.push('/exam-history')
        message.success('Экзамен успешно сохранен')
      })
      .catch(() => message.error('Что-то не так (проверьте заполнение результатов)'))
  }

  return (
    <>
      <Space style={{ marginBottom: '15px' }}>
        <AddStudent />

        <Button type="primary" onClick={onFinish}>Завершить экзамен</Button>
      </Space>


      <Table columns={columns} dataSource={data} loading={!data} pagination={false} bordered={true} />
    </>
  )
}

const mapStateToProps = (state) => ({
  data: state.exam.students,
})

export default connect(mapStateToProps, {
  setExamScore,
  setExamAttempt,
  removeExamStudent,
  saveExam
})(TableCreateExam)