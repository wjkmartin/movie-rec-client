import fs from 'fs';
const fsp = require('fs').promises

export default async function handler(req, res) {
  res
    .status(200)
    .json(
      await streamPrefscores({
        id: parseInt(req.query.uid),
        age: parseInt(req.query.age),
        gender: parseInt(req.query.gender),
      })
    )
}

export function generatePrefscore(userObject, movieObject) {
  const SERVER_URL =
    'https://movie-recs-working.herokuapp.com/v1/models/recommender_latest:predict';

  const { id, age, gender } = userObject;
  const userTensor = [[id, gender]];
  const itemTensor = [
    [
      movieObject.Action,
      movieObject.Adventure,
      movieObject.Animation,
      movieObject.Comedy,
      movieObject.Crime,
      movieObject.Documentary,
      movieObject.Drama,
      movieObject.Family,
      movieObject.Fantasy,
      movieObject.History,
      movieObject.Horror,
      movieObject.Music,
      movieObject.Mystery,
      movieObject.Romance,
      movieObject['Science Fiction'],
      movieObject['TV Movie'],
      movieObject.Thriller,
      movieObject.War,
      movieObject.Western,
    ],
  ];

  const query = {
    instances: [
      {
        user_input: userTensor,
        pos_item_input: itemTensor,
      },
    ],
  };

  const getMoviePrediction = async (_query) => {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      body: JSON.stringify(_query),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    return data.predictions[0][0];
  };

  return getMoviePrediction(query);
}

async function getPrefs(movieData, userData) {
  let prefs = [];
  for (let i = 0; i < movieData.length; i++) {
    generatePrefscore(userData, movieData[i]).then((score) => {
      prefs.push({
        movieId: movieData[i].id,
        score: score,
      });
    });
  }
  while (prefs.length < movieData.length) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return prefs;
}
const read = (path, type) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, type, (err, file) => {
      if (err) reject(err);
      resolve(file);
    });
  });

export async function streamPrefscores(userData) {
  const movieData = await fsp.readFile('data/movies.json')
  const movieDataParsed = JSON.parse(movieData).movies

  let prefs;
  prefs = await getPrefs(movieDataParsed, userData);

  // prefs.forEach((pref) => {
  //   writePrefToDB(pref, userData.user.id);
  // });

  return prefs;
}
