const { ipcMain } = require("electron")
const {
  signIn,
  getInfoAboutMe,
  getGroups,
  getStudentsByGroup,
  getDisciplines,
  getCabinets,
  getResultsExam,
  saveExam,
  getExamHistory,
  getExam,
  getAttestationResults
} = require("./requests")

module.exports = () => {

  ipcMain.handle('signIn', async (_, { login, password }) => {
    return signIn(login, password)
  })

  ipcMain.handle("getInfoAboutMe", async (_, { userId, role }) => {
    return getInfoAboutMe(userId, role)
  })

  ipcMain.handle("getStudentsByGroup", async (_, group) => {
    return getStudentsByGroup(group)
  })

  ipcMain.handle("getGroups", async () => {
    return getGroups()
  })

  ipcMain.handle("getCabinets", async () => {
    return getCabinets()
  })

  ipcMain.handle("getDisciplines", async () => {
    return getDisciplines()
  })

  ipcMain.handle("getResultsExam", async (_, examId) => {
    return getResultsExam(examId)
  })

  ipcMain.handle("saveExam", async (_, data) => {
    return saveExam(data)
  })

  ipcMain.handle("getExamHistory", async (_, teacherId) => {
    return getExamHistory(teacherId)
  })

  ipcMain.handle("getExam", async (_, examId) => {
    return getExam(examId)
  })

  ipcMain.handle("getAttestationResults", async (_, studentId) => {
    return getAttestationResults(studentId)
  })

}

