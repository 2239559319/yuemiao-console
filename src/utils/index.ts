import axios from 'axios';
import * as moment from 'moment';
import type { Person } from '../vue';

export async function encodeDepaCode(
  depaCode: string,
  workTimeId: number,
  st: number
): Promise<string> {
  const value = `${moment(st).format('YYYYMMDDHHmm')}${workTimeId}fuckhacker10000`;
  const res = await axios.get(`https://api.hashify.net/hash/md5/hex?value=${value}`);
  const { Digest: hex } = await res.data;
  return `${depaCode}_${hex}`;
}

export function getDefaultPerson(memberList: Person[]): Person {
  for (const p of memberList) {
    if (p.isDefault === 1) {
      return p;
    }
  }
}
