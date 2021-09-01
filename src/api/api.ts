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
 * 预约的人
 */
interface Person {
  address: string;
  birthday: string;
  createTime: string;
  id: number;
  idCardNo: string;
  name: string;
  regionCode: string;
  relationType: string;
  sex: number;
  sexText: string;
  userId: number;
}

export async function getHpvList(catalogId: number = 11): Promise<HpvType[]> {
  const path = '/base/catalog/catalogCustoms.do';
  const res = await axios.get(path, {
    params: {
      catalogId,
    },
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
      parentCode,
    },
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
    customId: vaccineId,
  };
  const res = await axios.post(path, params);
  const { data } = await res.data;
  return data.rows;
}

/**
 * @param depaCode 对应 Department.code
 * @param linkmanId
 * @param vaccCode
 * @param vaccIndex
 * @param departmentVaccineId
 * @param month
 */
export async function getWorkDaysByMonth(
  depaCode: string,
  linkmanId,
  vaccCode,
  vaccIndex,
  departmentVaccineId,
  month
) {

}
