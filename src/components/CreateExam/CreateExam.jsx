import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createExam } from '../../redux/examReducer'
import FormCreateExam from './FormCreateExam'
import TableCreateExam from './TableCreateExam/TableCreateExam'

const CreateExam = ({ createExam }) => {
  const [isCreated, setIsCreated] = useState(false)

  const [groups, setGroups] = useState([])
  const [disciplines, setDisciplines] = useState([])
  const [cabinets, setCabinets] = useState([])

  const onFinish = values => {
    createExam({
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      discipline: disciplines[values.discipline],
      cabinet: cabinets[values.cabinet]
    })
      .then(() => setIsCreated(true))
      .catch(e => alert(e))
  }

  useEffect(() => {
    (async function () {
      try {
        const resGroups = await window.ipcRenderer.invoke('getGroups')
        const resDisciplines = await window.ipcRenderer.invoke('getDisciplines')
        const resCabinets = await window.ipcRenderer.invoke('getCabinets')

        setGroups(resGroups)
        setDisciplines(resDisciplines)
        setCabinets(resCabinets)

      } catch (error) {
        message.error('Ошибка получения данных')
      }
    })()
  }, [])

  if (isCreated)
    return <TableCreateExam />


  return (
    <FormCreateExam
      onFinish={onFinish}
      groups={groups}
      disciplines={disciplines}
      cabinets={cabinets}
    />
  )
}

export default connect(null, {
  createExam
})(CreateExam)
