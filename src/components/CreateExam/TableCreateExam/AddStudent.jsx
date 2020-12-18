import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'antd'
import { Select, Space } from 'antd'
import { useDispatch } from 'react-redux'
import { addExamStudent } from './../../../redux/examReducer'

const { Option } = Select

const AddStudent = () => {
  const dispatch = useDispatch()

  const [groups, setGroups] = useState([])
  const [students, setStudents] = useState([])

  const [isModalVisible, setIsModalVisible] = useState(false)

  const [selectedGroup, setSelectedGroup] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)

  useEffect(() => {
    (async function () {
      try {
        const res = await window.ipcRenderer.invoke('getGroups')
        setGroups(res)
      } catch (error) {
        throw error
      }
    })()
  }, [])

  useEffect(() => {
    (async function () {
      try {
        const res = await window.ipcRenderer.invoke('getStudentsByGroup', selectedGroup)
        setStudents(res)
      } catch (error) {
        throw error
      }
    })()
  }, [selectedGroup])

  const okHandler = () => {
    dispatch(addExamStudent(students[selectedStudent]))

    setIsModalVisible(false)

    setSelectedGroup(null)
    setSelectedStudent(null)
  }

  const cancelHandler = () => {
    setIsModalVisible(false)
  }

  const changeGroup = (value) => {
    setSelectedStudent(null)
    setSelectedGroup(value)
  }

  const changeStudent = (value) => {
    setSelectedStudent(value)
  }

  return (
    <>
      <Button onClick={() => { setIsModalVisible(true) }}>Добавить студента</Button>

      <Modal
        title="Добавление студента"
        visible={isModalVisible}
        onOk={okHandler}
        onCancel={cancelHandler}
      >

        <Space>
          <Select value={selectedGroup} placeholder="Выберите группу" onChange={changeGroup}>
            {
              groups.map(item => (
                <Option value={item} key={item}>{item}</Option>
              ))
            }
          </Select>

          <Select value={selectedStudent} placeholder="Выберите студента" style={{ width: '300px' }} onChange={changeStudent} disabled={!selectedGroup}>
            {
              students.map((item, i) => (
                <Option value={i} key={item.id}>{item.fullname}</Option>
              ))
            }
          </Select>
        </Space>

      </Modal>
    </>
  )
}

export default AddStudent