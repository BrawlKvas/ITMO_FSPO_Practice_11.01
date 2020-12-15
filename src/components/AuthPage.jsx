import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { signIn } from './../redux/authReducer'

const AuthPage = ({ signIn }) => {
  const [form] = Form.useForm()

  const onFinish = ({ login, password }) => {
    signIn(login, password)
      .catch(e => {
        form.setFields([{ name: 'login', errors: [''] }, { name: 'password', errors: ["Неверный логин или пароль"] }])
      })
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Form
        form={form}
        initialValues={{
          login: '',
          password: '',
          remember: false,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Логин"
          name="login"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите логин',
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите пароль',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
        </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect(null, {
  signIn
})(AuthPage) 