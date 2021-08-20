/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser } = initialState || {};
  console.log(currentUser);
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canUser: currentUser && currentUser.access === 'user',
  };
}
