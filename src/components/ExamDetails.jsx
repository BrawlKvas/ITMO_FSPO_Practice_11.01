import { Table, Tag, message } from 'antd'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadExam } from './../redux/examReducer'
import ratingColors from './../values/ratingColors'

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
    key: 'attempt'
  },
  {
    title: 'Оценка',
    dataIndex: 'score',
    key: 'score',
    render: score => (
      <Tag color={ratingColors[score]}>{score}</Tag>
    )
  }
]

const ExamDetails = ({ match, data, loadExam }) => {
  const examId = match.params.examId

  useEffect(() => {
    loadExam(examId)
      .catch(() => message.error('Ошибка получения данных'))
  }, [examId, loadExam])

  return (
    <Table columns={columns} dataSource={data} loading={!data} pagination={false} bordered={true} />
  )
}

const mapStateToProps = (state) => ({
  data: state.exam.students
})

export default connect(mapStateToProps, {
  loadExam
})(ExamDetails)
