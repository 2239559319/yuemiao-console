import axios from 'axios';

interface HpvType {
  id: number;
  label: string;
  name: string;
}

interface Region {
  name: string;
  value: string;
}
/**
 * 医院信息，包括疫苗信息
 */
interface Department {
  address: string;
  code: string;
  depaVaccId: number;
  tel: string;
  total: number;
  vaccineCode: string;
  vaccineName: string;
  worktimeDesc: string;
}

/**
 * 单个医院疫苗信息
 */
interface DepartmentItem {
  departmentCode: string;
  departmentName: string;
  departmentVaccineId: number;
  vaccineCode: string;
  productId: number;
  total: number;
}

export type HyphenDate = `${number}-${number}-${number}`;

interface WorkTime {
  id: number;
  depaCode: string;
  departmentVaccineId: null | number;
  endTime: string;
  maxSub: number;
  startTime: string;
  workdayId: number;
}

interface Subscribe {
  subNo: number;
  subNoStr: string;
}

export async function getHpvList(catalogId: number = 11): Promise<HpvType[]> {
  const path = '/base/catalog/catalogCustoms.do';
  const res = await axios.get(path, {
    params: {
      catalogId
    }
  });
  const { data } = await res.data;
  return data.catalogCustoms;
}

export async function getChildRegion(
  parentCode: string = ''
): Promise<Region[]> {
  const path = '/base/region/childRegions.do';
  const res = await axios.get(path, {
    params: {
      parentCode
    }
  });
  const { data } = await res.data;
  return data;
}

/**
 * 获取地区医院的信息
 * @param regionCode 地区code
 * @param vaccineId 疫苗id
 */
export async function getDepartment(
  regionCode: string,
  vaccineId: string
): Promise<Department[]> {
  const path = '/base/department/getDepartments.do';
  const params = {
    offset: '0',
    limit: '100',
    name: '',
    regionCode,
    isOpen: '1',
    longitude: '',
    latitude: '',
    sortType: '1',
    vaccineCode: '',
    customId: vaccineId
  };
  const res = await axios.post(path, params);
  const { data } = await res.data;
  return data.rows;
}

/**
 * 查询单个医院疫苗信息
 * @param id depaVaccId
 */
export async function getDepartmentItem(id: number): Promise<DepartmentItem> {
  const path = '/base/departmentVaccine/item.do';
  const res = await axios.get(path, {
    params: {
      id,
      isShowDescribtion: true,
      showOthers: true
    }
  });
  const { data } = await res.data;
  return data;
}

/**
 * 查询工作日
 * @param depaCode 对应 Department.code
 * @param linkmanId 对应 Person.id
 * @param vaccCode 对应 Department.vaccineCode
 * @param vaccIndex 一针 | 二针 | 三针
 * @param departmentVaccineId 对应Department.depaVaccId
 * @param month 2021-09-01
 */
export async function getWorkDaysByMonth(
  depaCode: string,
  linkmanId: number,
  vaccCode: string,
  vaccIndex: 1 | 2 | 3,
  departmentVaccineId: number,
  month: HyphenDate
): Promise<HyphenDate[]> {
  const path = '/order/subscribe/workDaysByMonth.do';
  const res = await axios.get(path, {
    params: {
      depaCode,
      linkmanId,
      vaccCode,
      vaccIndex,
      departmentVaccineId,
      month
    }
  });
  const { data } = await res.data;
  return data.dateList;
}
/**
 * 查询预约数量
 * @param depaCode
 * @param vaccCode
 * @param vaccIndex
 * @param days '20210904,20210905,20210906,20210907,20210908,20210909,20210910'
 * @param departmentVaccineId
 */
export async function findSubscribeAmountByDays(
  depaCode: string,
  vaccCode: string,
  vaccIndex: 1 | 2 | 3,
  days: string,
  departmentVaccineId: number
): Promise<{ day: string; maxSub: number }[]> {
  const path = '/subscribe/subscribe/findSubscribeAmountByDays.do';
  const res = await axios.get(path, {
    params: {
      depaCode,
      vaccCode,
      vaccIndex,
      days,
      departmentVaccineId
    }
  });
  const { data } = await res.data;
  return data;
}

export async function getWorkTimes(
  depaCode: string,
  vaccCode: string,
  vaccIndex: 1 | 2 | 3,
  subsribeDate: HyphenDate,
  departmentVaccineId: number,
  linkmanId: number
): Promise<WorkTime[]> {
  const path = '/subscribe/subscribe/departmentWorkTimes2.do';
  const res = await axios.get(path, {
    params: {
      depaCode,
      vaccCode,
      vaccIndex,
      subsribeDate,
      departmentVaccineId,
      linkmanId
    }
  });
  const { data } = await res.data;
  const timeList = data.times.data;
  return timeList;
}
/**
 *
 * @param vaccineCode
 * @param vaccineIndex
 * @param linkmanId
 * @param subscribeDate
 * @param subscirbeTime 对应 WorkTime.id
 * @param departmentVaccineId
 * @param depaCode 这个和上面的不一样 为 depaCode + '_' + md5(moment(now).format("YYYYMMDDHHmm") + WorkTime.id + 'fuckhacker10000')
 * @param serviceFee 服务费
 * @param ticket $0.__vue__.$children[0].orderTicket
 */
export async function subscribeAdd(
  vaccineCode: string,
  vaccineIndex: 1 | 2 | 3,
  linkmanId: number,
  subscribeDate: HyphenDate,
  subscirbeTime: number,
  departmentVaccineId: number,
  depaCode: string,
  serviceFee: number,
  ticket: string
): Promise<Subscribe | null> {
  const path = '/subscribe/subscribe/add.do';
  const res = await axios.get(path, {
    params: {
      vaccineCode,
      vaccineIndex,
      linkmanId,
      subscribeDate,
      subscirbeTime,
      departmentVaccineId,
      depaCode,
      serviceFee,
      ticket
    }
  });
  const { data } = await res.data;
  return data;
}

/**
 *
 * @param subNo 上面的Subscribe.subNoStr
 */
export async function getSubmitDetail(
  subNo: string
): Promise<{ subscribeId: number } | null> {
  const path = '/subscribe/subscribe/submitDetail.do';
  const res = await axios.get(path, {
    params: {
      subNo
    }
  });
  const { data } = await res.data;
  return data;
}
/**
 *
 * @param id subscribeId
 */
export async function getClientDetail(
  id: number
): Promise<{ vaccine: unknown; subscribe: unknown } | null> {
  const path = '/order/subscribe/clientDetail.do';
  const res = await axios.get(path, {
    params: {
      id
    }
  });
  const { data } = await res.data;
  return data;
}
