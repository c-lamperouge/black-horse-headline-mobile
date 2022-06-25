import { openAppDB } from '@stores/openDB'
import type { ArticleSearchHistory as History } from '@stores/openDB'

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

const addHistory = async (history: History) => {
  const db = await openAppDB()
  const transaction = db.transaction('articleSearchHistories', 'readwrite')
  transaction.store.add(history)
  transaction.done.catch(reason => {
    console.error(reason)
  })
  db.close()
}

const deleteHistory = async (historyKey: string) => {
  const db = await openAppDB()
  const transaction = db.transaction('articleSearchHistories', 'readwrite')
  transaction.store.delete(historyKey)
  transaction.done.catch(reason => {
    console.error(reason)
  })
  db.close()
}

const clearHistories = async () => {
  const db = await openAppDB()
  const transaction = db.transaction('articleSearchHistories', 'readwrite')
  transaction.store.clear()
  transaction.done.catch(reason => {
    console.error(reason)
  })
  db.close()
}

export {
  getHistories,
  addHistory,
  deleteHistory,
  clearHistories
}

export type {
  History
}
