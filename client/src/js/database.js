import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // create a connection to the database and version we want to use
  const jateDB = await openDB('jate', 1);

  // create a new trasaction and specify the database and data privileges
  const tx = jateDB.transaction('jate', 'readwrite');

  // open up the desired object store
  const store = tx.objectStore('jate');

  // use .add() pass in the content
  const request = store.add({ content });

  // get confirmation of the request
  const result = await request;
  console.log('Data put to the database', result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // create connection to database and version we want to use
  const contactDb = await openDB('jate', 1);

  // create new transaction and specify the database and data privileges
  const tx = contactDb.transaction('jate', "readonly");

  // open up the desired object store
  const store = tx.objectStore('jate');

  // use .add() pass in the content
  const request = store.add({ content });

};

initdb();
