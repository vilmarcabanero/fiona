import localforage from 'localforage';

export function initDB() {
  localforage.config({
    name: 'Fiona',
  });
}
