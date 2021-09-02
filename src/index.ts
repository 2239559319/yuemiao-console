import { getDepartment } from './api';

(async () => {
  const data = await getDepartment('1101', '2');
  console.log(data);
})();
