const SET_EXAM_DATA = 'exam/SET_EXAM_DATA'
const SET_EXAM_SCORE = 'exam/SET_EXAM_SCORE'
const SET_EXAM_ATTEMPT = 'exam/SET_EXAM_ATTEMPT'
const REMOVE_EXAM_STUDENT = 'exam/REMOVE_EXAM_STUDENT'
const ADD_EXAM_STUDENT = 'exam/ADD_EXAM_STUDENT'
const REMOVE_EXAM_DATA = 'exam/REMOVE_EXAM_DATA'

const initState = {
  date: null,
  semester: null,
  group: null,
  teacher: null, // id
  discipline: null, // {id, name}
  cabinet: null, // {id, code}
  students: null // [{}]
}

const examReducer = (state = initState, action) => {
  switch (action.type) {

    case SET_EXAM_DATA:
      return {
        ...state,
        ...action.data
      }

    case REMOVE_EXAM_DATA:
      return { ...initState }

    case SET_EXAM_SCORE:
      return {
        ...state,
        students: state.students.map(elem => {
          if (elem.id === action.studentId)
            return { ...elem, score: action.score }

          return elem
        })
      }

    case SET_EXAM_ATTEMPT:
      return {
        ...state,
        students: state.students.map(elem => {
          if (elem.id === action.studentId)
            return { ...elem, attempt: action.attempt }

          return elem
        })
      }

    case REMOVE_EXAM_STUDENT:
      return {
        ...state,
        students: state.students.filter(elem => elem.id !== action.studentId)
      }

    case ADD_EXAM_STUDENT:
      //TODO Проверка на повторение
      return {
        ...state,
        students: [
          ...state.students,
          action.student
        ]
      }

    default:
      return state
  }
}

export default examReducer


//AC
const setExamData = (data) => ({ type: SET_EXAM_DATA, data })
const removeExamData = () => ({ type: REMOVE_EXAM_DATA })
export const setExamScore = (studentId, score) => ({ type: SET_EXAM_SCORE, studentId, score })
export const setExamAttempt = (studentId, attempt) => ({ type: SET_EXAM_ATTEMPT, studentId, attempt })

export const addExamStudent = (student) => ({
  type: ADD_EXAM_STUDENT,
  student: {
    ...student,
    attempt: null,
    score: null
  }
})

export const removeExamStudent = (studentId) => ({ type: REMOVE_EXAM_STUDENT, studentId })


//THUNK
export const createExam = (data) => async (dispatch, getState) => {
  try {
    const teacher = getState().auth.id

    const students = await window.ipcRenderer.invoke('getStudentsByGroup', data.group)
    students.forEach(item => {
      item.score = null
      item.attempt = null
    });

    await dispatch(setExamData({ ...data, teacher, students }))

  } catch (error) {
    throw error
  }
}

export const saveExam = () => async (dispatch, getState) => {
  try {
    if (getState().exam.students.find(item => !item.attempt || !item.score))
      throw new Error('Есть не заполненные поля')

    await window.ipcRenderer.invoke('saveExam', getState().exam)
    dispatch(removeExamData)
  } catch (error) {
    throw error
  }
}

export const loadExam = (id) => async (dispatch) => {
  try {
    const data = await window.ipcRenderer.invoke('getExam', id)
    const students = await window.ipcRenderer.invoke('getResultsExam', id)

    dispatch(setExamData({ ...data, students }))
  } catch (error) {
    throw error
  }
}