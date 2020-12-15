import React from 'react'
import { Select, Form, Button, DatePicker } from 'antd'

const { Option } = Select

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const FormCreateExam = ({onFinish, disciplines, cabinets, groups}) => {
  return (
    <div>
      <Form {...layout} name="create-exam" onFinish={onFinish}>
        <Form.Item label="Дисциплина" name="discipline" rules={[{ required: true, message: 'Выберите дисциплину' }]}>
          <Select placeholder="Веберите дисциплину">
            {
              disciplines.map((item, i) => (
                <Option value={i} key={item.id}>{item.name}</Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item label="Кабинет" name="cabinet" rules={[{ required: true, message: 'Выберите кабинет' }]}>
          <Select placeholder="Веберите кабинет">
            {
              cabinets.map((item, i) => (
                <Option value={i} key={item.id}>{item.code}</Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item label="Дата" name="date" rules={[{ required: true, message: 'Выберите дату' }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item label="Семестр" name="semester" rules={[{ required: true, message: 'Выберите семестр' }]}>
          <Select placeholder="Веберите семестр">
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
            <Option value={5}>5</Option>
            <Option value={6}>6</Option>
            <Option value={7}>7</Option>
            <Option value={8}>8</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Группа" name="group" rules={[{ required: true, message: 'Выберите группу' }]}>
          <Select placeholder="Веберите группу">
            {
              groups.map(item => (
                <Option value={item} key={item}>{item}</Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <Button type="primary" htmlType="submit">Создать</Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default FormCreateExam
