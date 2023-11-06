const fs = require('fs');
const https = require('https');
const path = require('path');
const JSON_PATH = path.join(__dirname, 'playerList.json');

const API_KEY = '';
const BASE_URL = `https://tw2.api.riotgames.com/tft/summoner/v1/summoners/by-name/`;

function fetchId(name) {
  return new Promise((resolve, reject) => {
    https
      .get(`${BASE_URL}${name}?api_key=${API_KEY}`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          resolve(JSON.parse(data).id);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

async function updateIdForTeam(team) {
  for (let player of team) {
    try {
      player.id = await fetchId(player.name);
    } catch (error) {
      console.log(`Error fetching ID for ${player.name}:`, error);
    }
  }
}

async function updateAllIds(jsonData) {
  const teams = Object.values(jsonData);
  for (let team of teams) {
    await updateIdForTeam(team);
  }
  return jsonData;
}

fs.readFile(JSON_PATH, 'utf8', async (err, jsonString) => {
  if (err) {
    console.log('Error reading file from disk:', err);
    return;
  }
  try {
    const jsonData = JSON.parse(jsonString);
    const updatedData = await updateAllIds(jsonData);

    fs.writeFile(JSON_PATH, JSON.stringify(updatedData, null, 2), (err) => {
      if (err) console.log('Error writing updated data to file:', err);
      else console.log('JSON file updated successfully!');
    });
  } catch (err) {
    console.log('Error parsing JSON string:', err);
  }
});
