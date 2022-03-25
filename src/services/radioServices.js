import fetch from "node-fetch";

async function getLatestPath() {
  const latestSessionUrl =
    "https://livetiming.formula1.com/static/SessionInfo.json";
  const latestSession = await fetch(latestSessionUrl);
  const path = (await latestSession.json()).Path;
  return path;
}

export async function getLatestSessionRadios() {
  const path = await getLatestPath();
  const latestSessionRadiosUrl = `https://livetiming.formula1.com/static/${path}TeamRadio.json`;
  const latestSessionRadios = await fetch(latestSessionRadiosUrl);
  const radios = await latestSessionRadios.json();
  console.log(latestSessionRadiosUrl);
  return radios;
}

export async function getLatestRadio(index) {
  const latestSessionRadios = (await getLatestSessionRadios()).Captures;
  // reverse() is destructive, so you have to copy it first using spread operator`
  const reversed = [...latestSessionRadios].reverse();
  const lastIndex = latestSessionRadios.length - 1;
  const racePath = await getLatestPath();
  let radioPath;
  if (index === 0) {
    radioPath = latestSessionRadios[index].Path;
  } else if (!index) {
    index = 0;
    radioPath = reversed[index].Path;
  } else if (index > lastIndex || index < -lastIndex) {
    return null;
  } else if (index > 0) {
    radioPath = latestSessionRadios[index].Path;
  } else if (index < 0) {
    radioPath = reversed[Math.abs(index)].Path;
  }
  const radioUrl = `https://livetiming.formula1.com/static/${
    racePath + radioPath
  }`;
  console.log(radioUrl);
  return radioUrl;
}
