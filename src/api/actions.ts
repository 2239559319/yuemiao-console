import {
  getDepartmentItem,
  getWorkDaysByMonth,
  findSubscribeAmountByDays,
  getWorkTimes,
  subscribeAdd,
  getSubmitDetail,
  getClientDetail,
  HyphenDate
} from './api';
import { store } from '../vue';
import { getDefaultPerson, encodeDepaCode } from '../utils';
import moment from 'moment';

const linkmanId = getDefaultPerson(store.state.memberList).id;
const ticket = store.state.orderTicket;

async function findWorkTime(
  depaVaccId: number,
  vaccIndex: 1 | 2 | 3
): Promise<{ subscribeDate: HyphenDate; subscirbeTime: number; vaccineCode: string; depaCode: string } | undefined> {
  const { total, departmentCode, vaccineCode } = await getDepartmentItem(
    depaVaccId
  );
  if (total > 0) {
    const workdays = await getWorkDaysByMonth(
      departmentCode,
      linkmanId,
      vaccineCode,
      vaccIndex,
      depaVaccId,
      moment().format('YYYY-MM-DD') as HyphenDate
    );
    const subscribeWorkdays = await findSubscribeAmountByDays(
      departmentCode,
      vaccineCode,
      vaccIndex,
      workdays.join(','),
      depaVaccId
    );
    for (const day of subscribeWorkdays) {
      if (day.maxSub > 0) {
        const worktimes = await getWorkTimes(
          departmentCode,
          vaccineCode,
          vaccIndex,
          moment(day.day).format('YYYY-MM-DD') as HyphenDate,
          depaVaccId,
          linkmanId
        );
        for (const workTime of worktimes) {
          if (workTime.maxSub > 0) {
            return {
              subscribeDate: moment(day.day).format('YYYY-MM-DD') as HyphenDate,
              subscirbeTime: workTime.id,
              vaccineCode,
              depaCode: departmentCode
            };
          }
        }
      }
    }
    return null;
  }
  return null;
}

export function start(depaVaccId: number, vaccIndex: 1 | 2 | 3): () => void {
  const timer = window.setInterval(async () => {
    const worktimes = await findWorkTime(depaVaccId, vaccIndex);
    if (worktimes) {
      const { subscirbeTime, subscribeDate, depaCode, vaccineCode } = worktimes;
      const encodeDepaCodeStr = await encodeDepaCode(depaCode, subscirbeTime, new Date().getTime());
      const { subNoStr } = await subscribeAdd(
        vaccineCode,
        vaccIndex,
        linkmanId,
        subscribeDate,
        subscirbeTime,
        depaVaccId,
        encodeDepaCodeStr,
        0,
        ticket);
      const { subscribeId } = await getSubmitDetail(subNoStr);
      const { subscribe, vaccine } = await getClientDetail(subscribeId);
      if (subscribe && vaccine) {
        console.log('成功预约');
        clearInterval(timer);
      }
    }
  }, 1000);
  return () => {
    clearInterval(timer);
  };
}
