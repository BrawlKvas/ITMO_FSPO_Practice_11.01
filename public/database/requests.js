const { createConnection } = require('./database')

const STUDENT = 'student'
const TEACHER = 'teacher'

const getInfoAboutMe = async (userId, role) => {
  let connect = null

  try {
    connect = await createConnection()

    if (role === STUDENT) {

      const [result] = await connect.query(`SELECT * FROM student WHERE user_id=${userId}`)

      if (result.length === 0) throw "Соответствующий студент не найден"

      return result[0]

    } else if (role == TEACHER) {

      const [result] = await connect.query(`SELECT * FROM teacher WHERE user_id=${userId}`)

      if (result.length === 0) throw "Соответствующий преподаватель не найден"

      return result[0]
    }

    throw "Что-то пошло не так"

  } catch (error) {
    throw error
  } finally {
    connect.end()
  }
}

const signIn = async (login, password) => {
  let connect = null

  try {
    connect = await createConnection()

    const [res] = await connect.query(`SELECT id, role FROM user WHERE login="${login}" AND password="${password}"`)

    if (res.length === 0) throw "Неверный логин или пароль"

    const userId = res[0].id
    const role = res[0].role

    const obj = await getInfoAboutMe(userId, role)

    return { userId, role, id: obj.id }

  } catch (error) {
    throw error
  } finally {
    connect.end()
  }
}

const getGroups = async () => {
  let connect = null

  try {
    connect = await createConnection()

    const [res] = await connect.query('SELECT STUDENT.group from student GROUP BY STUDENT.group ASC')

    return res.map(item => item.group)

  } catch (error) {
    throw error
  } finally {
    connect.end()
  }
}

const getStudentsByGroup = async (group) => {
  let connect = null

  try {
    connect = await createConnection()

    const [res] = await connect.query(
      `SELECT *, student.id as "key", concat(last_name, " ", first_name, " ", patronymic) as fullname FROM student
       WHERE STUDENT.group=${group} 
       ORDER BY concat(last_name, " ", first_name, " ", patronymic)`
    )

    return res

  } catch (error) {
    throw error
  } finally {
    connect.end()
  }
}

const getCabinets = async () => {
  let connect = null

  try {
    connect = await createConnection()

    return (await connect.query('SELECT id, code FROM cabinet ORDER BY code'))[0]

  } catch (error) {
    throw error
  } finally {
    connect.end()
  }
}

const getDisciplines = async () => {
  let connect = null

  try {
    connect = await createConnection()

    return (await connect.query('SELECT id, name FROM discipline ORDER BY name'))[0]

  } catch (error) {
    throw error
  } finally {
    connect.end()
  }
}

const getExamHistory = async (id) => {
  let connect = null

  try {
    connect = await createConnection()

    return (
      await connect.query(
        `SELECT exam.id, exam.id as "key", DATE_FORMAT(exam.date, "%d-%m-%Y") as date, semester, exam.group, discipline.name as discipline, cabinet.code as cabinet FROM exam 
        join discipline on discipline.id=discipline_id 
        join cabinet on cabinet.id=cabinet_id 
        WHERE teacher_id=${id} 
        ORDER BY DATE(date) desc`
      )
    )[0]

  } catch (error) {
    throw error
  } finally {
    connect.end()
  }
}

const getResultsExam = async (id) => {
  let connect = null

  try {
    connect = await createConnection()

    return (await connect.query(
      `select student.id, student.id as "key", concat(last_name, " ", first_name, " ", patronymic) as fullname, gender, student.group, course, score, attempt, grade_book from exam_result 
       join student on exam_result.student_id=student.id 
       where exam_id=${id} 
       ORDER BY concat(last_name, " ", first_name, " ", patronymic)`))[0]

  } catch (error) {
    throw error
  } finally {
    connect.end()
  }
}

const getExam = async (examId) => {
  let connect = null

  try {
    connect = await createConnection()

    return (await connect.query(`SELECT id, date, exam.group FROM exam WHERE id=${examId}`))[0]

  } catch (error) {
    throw error
  } finally {
    connect.end()
  }
}

const saveExam = async (data) => { // exam - Информация о экзамене. results - Результаты экзамена
  let connect = null

  try {
    connect = await createConnection()

    const [{ insertId }] = await connect.query(
      `INSERT INTO exam (exam.date, semester, exam.group, teacher_id, discipline_id, cabinet_id) 
      VALUES ("${data.date}", ${data.semester}, ${data.group}, ${data.teacher}, ${data.discipline.id}, ${data.cabinet.id})`
    )

    const students = data.students

    for (let i = 0; i < students.length; i++) {
      await connect.query(
        `INSERT INTO exam_result (score, attempt, student_id, exam_id) 
        VALUES (${students[i].score}, ${students[i].attempt}, ${students[i].id}, ${insertId})`
      )
    }

  } catch (error) {
    throw error
  } finally {
    connect.end()
  }
}

const getAttestationResults = async (studentId) => {
  let connect = null

  try {
    connect = await createConnection()

    const resultBySemester = [[], [], [], [], [], [], [], []]
    const [res] = await connect.query(
      `SELECT exam_result.id as "key", discipline.name as discipline, DATE_FORMAT(exam.date, "%d-%m-%Y") as date, semester, score, attempt, concat(last_name, " ", first_name, " ", patronymic) as teacher FROM exam_result 
      join exam on exam.id=exam_id 
      join discipline on discipline.id=exam.discipline_id 
      join teacher on teacher.id=exam.teacher_id
      WHERE student_id=${studentId} ORDER BY discipline.name`
    )

    res.forEach(item => {
      resultBySemester[item.semester - 1].push(item)
    })

    return resultBySemester

  } catch (error) {
    throw error
  } finally {
    connect.end()
  }
}

getAttestationResults(10)

module.exports.signIn = signIn
module.exports.getInfoAboutMe = getInfoAboutMe
module.exports.getGroups = getGroups
module.exports.getStudentsByGroup = getStudentsByGroup
module.exports.getDisciplines = getDisciplines
module.exports.getCabinets = getCabinets
module.exports.getExamHistory = getExamHistory
module.exports.getResultsExam = getResultsExam
module.exports.saveExam = saveExam
module.exports.getExam = getExam
module.exports.getAttestationResults = getAttestationResults