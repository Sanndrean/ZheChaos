import { connectFirebase } from './firebase.js';
import { get, onDisconnect, onValue, ref, set, update, remove } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js';

let connection;
const roomRef = code => ref(connection.db, `rooms/${code}`);
const playerRef = (code, uid) => ref(connection.db, `rooms/${code}/players/${uid}`);
const codeChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const makeRoomCode = () => Array.from({length:5}, () => codeChars[Math.floor(Math.random()*codeChars.length)]).join('');
export const makeId = () => crypto.randomUUID();

export async function connect() { connection = await connectFirebase(); return connection; }
export const currentUid = () => connection?.uid;

export async function createRoom({name, photo, modeId, mode}) {
  const code = makeRoomCode(), uid = connection.uid, now = Date.now();
  const player = { id:uid, name, photo, joinedAt:now, score:0, hearts:2, ready:true };
  const room = {
    hostId:uid, status:'lobby', mode:modeId, modeInfo:{title:mode.title,subtitle:mode.subtitle},
    createdAt:now, roundNumber:0, cupCount:mode.initialCupCount,
    players:{[uid]:player},
    round:{phase:'idle',cups:Array.from({length:mode.initialCupCount},(_,i)=>({id:`cup-${i+1}`,slot:i})),ballCupId:'cup-2',guesses:{},opened:false}
  };
  await set(roomRef(code), room);
  await trackPresence(code,uid);
  return code;
}

export async function joinRoom(code,{name,photo}) {
  const uid=connection.uid, snap=await get(roomRef(code));
  if(!snap.exists()) throw new Error('Kode room tidak ditemukan. Cek lagi, ya.');
  const room=snap.val();
  if(room.status==='ended') throw new Error('Game ini sudah selesai. Minta host membuat room baru.');
  const player={id:uid,name,photo,joinedAt:Date.now(),score:0,hearts:2,ready:true};
  await set(playerRef(code,uid),player);
  await trackPresence(code,uid);
  return code;
}

async function trackPresence(code,uid) {
  const r=ref(connection.db,`rooms/${code}/players/${uid}`);
  await onDisconnect(r).remove();
}
export function watchRoom(code, callback, errorCallback) {
  return onValue(roomRef(code), snap => callback(snap.exists()?snap.val():null), err=>errorCallback?.(err));
}
export const patchRoom=(code, value)=>update(roomRef(code),value);
export const patchPlayer=(code,uid,value)=>update(playerRef(code,uid),value);
export async function leaveRoom(code) {
  if(!connection?.uid)return;
  const snap=await get(roomRef(code));if(!snap.exists())return;
  const room=snap.val(), remaining=Object.keys(room.players||{}).filter(uid=>uid!==connection.uid);
  if(room.hostId===connection.uid){
    if(!remaining.length){await remove(roomRef(code));return}
    await update(roomRef(code),{hostId:remaining[0]});
  }
  await remove(playerRef(code,connection.uid));
}
export const deleteRoom=code=>remove(roomRef(code));
