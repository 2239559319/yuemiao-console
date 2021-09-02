import { start } from './api';

(async (depaVaccId: number, vaccIndex: 1 | 2 | 3) => {
  start(depaVaccId, vaccIndex);
})(21016, 1);
