import { openDB, DBSchema } from 'idb'

interface DBApp extends DBSchema {
  selectPage: {
    key: 'isShowenFirstView' | 'isLoggedIn'
    value: boolean
  }
  authorization: {
    key: 'token' | 'refreshToken'
    value: string
  }
}

const openDBApp = async () => {
  const db = await openDB<DBApp>('app', 1, {
    blocked: () => {
      // seems an older version of this app is running in another tab
      window.alert('Please close this app opened in other browser tabs.')
    },

    blocking: () => {
      // seems the user just opened this app again in a new tab
      // which happens to have gotten a version change
      window.alert('App is outdated, please close this tab')
      location.reload()
    },

    upgrade: (db, oldVersion, newVersion, transaction) => {
      if (oldVersion === 0 && newVersion === 1) {
        db.createObjectStore('selectPage')
        db.createObjectStore('authorization')
      } else {
        console.error('unknown database network version change')
      }

      transaction.done.then(() => {
        console.log('open database network successfully')
      }).catch(e => {
        console.error(e)
      })
    }
  })

  return db
}

export {
  openDBApp
}
