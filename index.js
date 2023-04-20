//1

const fs = require('fs');
const friends = fs.readFileSync('input.json');
const { friend1, friend2 } = JSON.parse(friends);

const transformNumber = (friend1, friend2) =>{
  if (friend1 === friend2) {
    return true;
  }
  if (friend1 * 2 <= friend2) {
    if (transformNumber(friend1 * 2, friend2)) {
      return true;
    }
  }
  if (friend1 * 10 + 1 <= friend2) {
    if (transformNumber(friend1 * 10 + 1, friend2)) {
      return true;
    }
  }

  return false;
}
let result = transformNumber(friend1, friend2);




//2
const duplicateInput = fs.readFileSync('input.json');
const {duplicate} = JSON.parse(duplicateInput);
const  findDuplicate = (duplicate) =>{
  for (let i = 0; i < duplicate.length; i++) {
    let j = i + 1;
    while (j < duplicate.length) {
      if (duplicate[i] === duplicate[j]) {
        return duplicate[i];
      }
      j++;
    }
  }
  return null;
}











//3.2


const tShorts = fs.readFileSync('input.json');
const {cnt, S, M, L} = JSON.parse(tShorts);
const distributeTshirts =(cnt, S, M, L) =>{
  const res = new Array(cnt.length).fill(0);
  for (let i = 0; i < cnt.length; i++) {
    if (S[i] > 0) {
      res[i] += 1;
      S[i] -= 1;
      cnt[i] -= 1;
    }
    if (L[i] > 0) {
      res[i] += 3;
      L[i] -= 1;
      cnt[i] -= 1;
    }
  }

  for (let i = 0; i < cnt.length; i++) {
    if (S[i] > 0 && cnt[i] > 0) {
      const giveS = Math.min(cnt[i], S[i]);
      res[i] += giveS;
      S[i] -= giveS;
      cnt[i] -= giveS;
    }
    if (M[i] > 0 && cnt[i] > 0) {
      const giveM = Math.min(cnt[i], S[i]);
      res[i] += 2 * giveM;
      M[i] -= giveM;
      cnt[i] -= giveM;
    }
    if (M[i] > 0 && S[i] === 0 && cnt[i] > 0) {
      const giveM = Math.min(cnt[i], M[i]);
      res[i] += 2 * giveM;
      M[i] -= giveM;
      cnt[i] -= giveM;
    }
    if (L[i] > 0 && (S[i] === 0 && M[i] === 0) && cnt[i] > 0) {
      const giveL = Math.min(cnt[i], L[i]);
      res[i] += 3 * giveL;
      L[i] -= giveL;
      cnt[i] -= giveL;
    }
    if (cnt[i] > 0) {
      return "NO";
    }
  }

  return res.join(" ");
}




//4
const bestPos = fs.readFileSync('input.json');
const { n, m, scene } = JSON.parse(bestPos);

const bestPositions = (scene) => {
  let goodPositions = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (scene[i][j] === 0) {
        goodPositions += i > 0 && scene[i - 1][j] === 1;
        goodPositions += i < n - 1 && scene[i + 1][j] === 1;
        goodPositions += j > 0 && scene[i][j - 1] === 1;

        goodPositions += j < m - 1 && scene[i][j + 1] === 1;
      }
    }
  }
  return goodPositions;
};






const friendsOutput = JSON.stringify({
  answerNum: result ? 
  `Можна перетворити число ${friend1} на число ${friend2}` :
  `Не можна перетворити число ${friend1} на число ${friend2}` ,
  duplicate: findDuplicate(duplicate),
  tShorts: distributeTshirts(cnt, S, M, L),
  bestPos: bestPositions(scene)
});
fs.writeFileSync('output.json', friendsOutput);