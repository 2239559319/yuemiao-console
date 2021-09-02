import { encodeDepaCode } from '../src/utils';
import axios from 'axios';
import * as md5 from 'crypto-js/md5';

jest.mock('axios');

describe('test encode', () => {
  const res = '3101040008_05b8b68529606b07eba4a9c97349a3a4';
  const depaCode = '3101040008';
  const st = 1630492026171;
  const workTimeId = 119850;

  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.get.mockImplementation((url: string) => {
    const value = (new URL(url)).searchParams.get('value');
    const mockResponse = {
      data: {
        Digest: md5(value)
      }
    };
    return Promise.resolve(mockResponse);
  });

  it('test md5', async () => {
    const encodeData = await encodeDepaCode(depaCode, workTimeId, st);
    expect(encodeData).toBe(res);
  });
});
