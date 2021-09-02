import type Vue from 'vue';
import type { RouteConfig, Route } from 'vue-router';
import type VueRouter from 'vue-router';
import type { Store } from 'vuex';

interface City {
  cityId: string;
  cityName: string;
  cityFirstLetter?: string;
  citySpell?: string;
}

/**
 * 预约的人
 */
export interface Person {
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
  isDefault: 0 | 1;
}

interface State {
  cities: City[];
  currentCityCode: string;
  orderTicket: string;
  memberList: Person[];
}

export const vm: Vue = (document.querySelector('#app') as any).__vue__;

export const router: VueRouter = vm.$router;
export const routesConfig: RouteConfig[] = router.options.routes;

export const route: Route = vm.$route;

export const store: Store<State> = vm.$store;
