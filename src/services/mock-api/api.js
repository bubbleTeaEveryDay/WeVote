// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
import axios from 'axios';

/** 获取当前的用户 GET /api/currentUser */

export async function currentUser(options) {
  return request('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 登录接口 POST /api/login/account */

export async function login(body, options) {
  return request('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getElection() {
  return axios({
    url: 'https://60ef0447f587af00179d387b.mockapi.io/election',
    method: 'get',
    type: 'json',
  }).then((receive) => {
    let currentTime = new Date();
    for (let i = 0; i < receive.data.length; i++) {
      let startTime = new Date(receive.data[i].startAt);
      let registerEnd = new Date(receive.data[i].registerEnd);

      let endTime = new Date(receive.data[i].endAt);
      let register = new Date(receive.data[i].register);
      let breakTime = new Date(receive.data[i].break);

      if (register > currentTime) {
        receive.data[i].status = 0;
      } else if (registerEnd > currentTime) {
        receive.data[i].status = 1;
      } else if (endTime > currentTime) {
        receive.data[i].status = 2;
      } else if (breakTime > currentTime) {
        receive.data[i].status = 3;
      } else {
        receive.data[i].status = 4;
      }
    }

    console.log(receive);
    return {
      data: receive.data,
      success: receive.status,
    };
  });
}

/** 新建规则 PUT /api/rule */
export async function addElection(elections, candidate) {
  let res = await axios.post('https://60ef0447f587af00179d387b.mockapi.io/election', elections);
  // await postMultiple(res.data.key, ...candidate);
  await Promise.all(
    candidate.map((obj) =>
      axios.post(
        `https://60ef0447f587af00179d387b.mockapi.io/election/${res.data.key}/candidate`,
        obj,
      ),
    ),
  );
}

export async function removeElection(id) {
  return axios.delete(`https://60ef0447f587af00179d387b.mockapi.io/election/${id}`);
}

export async function vote(ElectionId, candidateID) {
  let res = await axios.get(
    `https://60ef0447f587af00179d387b.mockapi.io/election/${ElectionId}/candidate/${candidateID}`,
  );
  res.data.num = res.data.num + 1;
  let res2 = await axios.put(
    `https://60ef0447f587af00179d387b.mockapi.io/election/${ElectionId}/candidate/${candidateID}`,
    res.data,
  );
  if ((res2.status = 200)) {
    return true;
  } else {
    return false;
  }
}
// export async function getCandidate(id) {
//   await axios({
//     url: `https://60ef0447f587af00179d387b.mockapi.io/election/${i}/candidate`,
//     method: 'get',
//     type: 'json',
//   });
// }
