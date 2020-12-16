import { Menu } from 'antd'
import { Layout } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import {
  BookOutlined,
  InfoCircleOutlined,
  UserOutlined,
  TableOutlined,
  PoweroffOutlined
} from '@ant-design/icons'

const { Sider } = Layout

const STUDENT = 'student' //?
const TEACHER = 'teacher'

const Side = ({ role, signOut }) => {
  const history = useHistory()

  const [collapsed, setCollapsed] = useState(true)

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo"></div>

      <Menu theme="dark" defaultSelectedKeys={[history.location.pathname]} mode="inline">

        <Menu.Item key="/profile" icon={<UserOutlined />}>
          <NavLink to="/profile">Профиль</NavLink>
        </Menu.Item>

        {role === STUDENT &&

          <Menu.Item key="/results" icon={<BookOutlined />}>
            <NavLink to="/results">Зачетка</NavLink>
          </Menu.Item>
        }

        {role === TEACHER &&

          <SubMenu key="sub1" icon={<TableOutlined />} title="Экзамен">
            <Menu.Item key="/exam-history"><NavLink to="/exam-history">История</NavLink></Menu.Item>
            <Menu.Item key="/creation-exam"><NavLink to="/creation-exam">Создать</NavLink></Menu.Item>
          </SubMenu>
        }

        <Menu.Item key="/infoapp" icon={<InfoCircleOutlined />}>
          <NavLink to="/infoapp">О приложении</NavLink>
        </Menu.Item>

        <Menu.Item key="10" icon={<PoweroffOutlined />} onClick={signOut}>
          Выход
        </Menu.Item>

      </Menu>

    </Sider>
  )
}

export default Side