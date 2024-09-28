
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const POST_ENDPOINTS = {
  ALL_POSTS: `${BASE_URL}/posts`,
  POST_BY_ID: (id: string) => `${BASE_URL}/posts/${id}`,
};
