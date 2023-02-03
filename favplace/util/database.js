import * as SQLite from "expo-sqlite";

import { Place } from "../models/Place";
//try pocketbase sometime lol
//creating a database object with sqlLite
const database = SQLite.openDatabase("places.db");

//App.js transaction creating place items in our places list in our app
export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

//addplaces transaction [?] are undefined values that live on this object we want to insert
export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

//allplaces transaction
export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        //empty dependency because we want all held data when we execute this screen
        [],
        (_, result) => {
          const places = [];

          for (const dataPoint of result.rows._array) {
            places.push(
              new Place(
                dataPoint.title,
                dataPoint.imageUri,
                {
                  address: dataPoint.address,
                  lat: dataPoint.lat,
                  lng: dataPoint.lng,
                },
                dataPoint.id
              )
            );
          }
          resolve(places);
        },

        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

//fetching everywhere our id is equal to the specified id to the object
export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          //this data we get form the model is not set the same way we have it in our db so we need some helper consts
          const dbPlace = result.rows._array[0];
          const place = new Place(
            dbPlace.title,
            dbPlace.imageUri,
            {
              lat: dbPlace.lat,
              lng: dbPlace.lng,
              address: dbPlace.address,
            },
            dbPlace.id
          );
          //this is the place that we fetch via id
          resolve(place);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
