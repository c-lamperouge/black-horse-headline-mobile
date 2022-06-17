<script setup lang="ts">
import { openDB } from 'idb'

const createDB = () => {
  openDB('db1', 1, {
    upgrade (db) {
      db.createObjectStore('store1')
      db.createObjectStore('store2')
    }
  })
  openDB('db2', 1, {
    upgrade (db) {
      db.createObjectStore('store3', { keyPath: 'id' })
      db.createObjectStore('store4', { autoIncrement: true })
    }
  })
}

const addData = async () => {
  const db1 = await openDB('db1', 1)
  db1
    .add('store1', 'hello again!!', 'new message')
    .then(result => {
      console.log('success!', result)
    })
    .catch(err => {
      console.error('error: ', err)
    })
  db1.close()
}

const addData2 = async () => {
  const db2 = await openDB('db2', 1)
  db2.add('store3', { id: 'cat001', strength: 10, speed: 10 })
  db2.add('store3', { id: 'cat002', strength: 11, speed: 9 })
  db2.add('store4', { id: 'cat003', strength: 8, speed: 12 })
  db2.add('store4', { id: 'cat004', strength: 12, speed: 13 })
  db2.close()
}

const retrieveData = async () => {
  const db2 = await openDB('db2', 1)
  // retrieve by key:
  db2.get('store3', 'cat001').then(console.log)
  // retrieve all:
  db2.getAll('store3').then(console.log)
  // count the total number of items in a store:
  db2.count('store3').then(console.log)
  // get all keys:
  db2.getAllKeys('store3').then(console.log)
  db2.close()
}

const updateData = async () => {
  // set db1/store1/delivered to be false:
  const db1 = await openDB('db1', 1)
  db1.put('store1', false, 'delivered')
  db1.close()
  // replace cat001 with a supercat:
  const db2 = await openDB('db2', 1)
  db2.put('store3', { id: 'cat001', strength: 99, speed: 99 })
  db2.close()
}

const transaction = async () => {
  const db2 = await openDB('db2', 1)
  // open a new transaction, declare which stores are involved:
  const transaction = db2.transaction(['store3', 'store4'], 'readwrite')
  // do multiple things inside the transaction, if one fails all fail:
  const superCat = await transaction.objectStore('store3').get('cat001')
  transaction.objectStore('store3').delete('cat001')
  transaction.objectStore('store4').add(superCat)
  db2.close()
}
</script>

<template>
  <div class="block-container">
    <button @click="createDB">
      create db
    </button>

    <button @click="addData">
      add data
    </button>

    <button @click="addData2">
      add data 2
    </button>

    <button @click="retrieveData">
      retrieve data
    </button>

    <button @click="updateData">
      update data
    </button>

    <button @click="transaction">
      transaction
    </button>
  </div>
</template>

<style lang="postcss" scoped>
.block-container {
  display: block flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #edeff3;
}
</style>
