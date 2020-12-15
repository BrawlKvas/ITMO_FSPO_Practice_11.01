import React from 'react'
import { Layout } from 'antd'
import Header from './components/Header'
import Side from './components/Side'
import { connect } from 'react-redux'
import AuthPage from './components/AuthPage'
import { Redirect, Route, Switch } from 'react-router-dom'
import { signOut } from './redux/authReducer'
import ProfileContainer from './components/Profile/ProfileContainer'
import InfoApp from './components/InfoApp'
import CreateExam from './components/CreateExam/CreateExam'
import ExamHistory from './components/ExamHistory/ExamHistory'
import ExamDetails from './components/ExamDetails'
import AttestationResults from './components/AttestationResults'

const { Content } = Layout

const STUDENT = 'student' //?
const TEACHER = 'teacher'

const App = ({ isAuth, role, signOut }) => {

  if (!isAuth)
    return <AuthPage />

  return (
    <Layout style={{ minHeight: '100vh' }}>

      <Side role={role} signOut={signOut} />

      <Layout className="site-layout">
        <Header />

        <Content style={{ margin: '20px' }}>

          <Switch>
            <Route path="/profile" component={ProfileContainer} />
            <Route path="/infoapp" component={InfoApp} />

            {role === STUDENT &&
              <Route path="/results" component={AttestationResults} />
            }

            {role === TEACHER &&
              <Route path="/exam-history" component={ExamHistory} />
            }

            {role === TEACHER &&
              <Route path="/creation-exam" component={CreateExam} />
            }

            {role === TEACHER &&
              <Route path="/exam/:examId?" component={ExamDetails} />
            }

            <Redirect to="/profile" />
          </Switch>



        </Content>
      </Layout>

    </Layout>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  role: state.auth.role,
})

export default connect(mapStateToProps, {
  signOut
})(App)