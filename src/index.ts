import { getHpvList, getDepartment } from './api';
import { vm, routesConfig } from './vue';

(async() => {
  const data = await getDepartment('1101', '2');
  console.log(data);
})();
