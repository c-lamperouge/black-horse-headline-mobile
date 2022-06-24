import { openAppDB } from '@stores/openDB'

const getHistories = async () => {
  const db = await openAppDB()
  const transaction = db.transaction('articleSearchHistories')
  const histories = await transaction.store.getAll()
  transaction.done.catch(reason => {
    console.error(reason)
  })
  db.close()

  return histories
}

export {
  getHistories
}
