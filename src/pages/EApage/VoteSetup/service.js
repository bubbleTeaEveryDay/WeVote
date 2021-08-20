import { request } from 'umi';

export async function submitForm(params) {
  return request('https://60ef0447f587af00179d387b.mockapi.io/election', {
    method: 'POST',
    data: params,
  });
}
