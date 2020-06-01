import axios from 'axios';
import authHeader from './auth-header';

export const PAGE_URL = {
  TECH_STACK: "https://docs.google.com/document/d/e/2PACX-1vT8K-A700Va1Yh2_b4Iqz26IOV7o8lPmZn-Uz1MeTGXf8vnbm39XlSj7IhxJB9LVWGsFhXik_gxcCYC/pub?embedded=true",
  DATA_PRIVACY: "https://docs.google.com/document/d/e/2PACX-1vTJhlfuTVreZOagHv2gaKCjzYiTjOyCCwm9Kn6aAeHDYIQXKd5EEEUobdGqP8eyF5nCuvW2QXR8sIy4/pub?embedded=true",
  IMPRINT: "https://docs.google.com/document/d/e/2PACX-1vSz-9IBEzk8gQh-wqIK75wZ1IZ_7MpSEyF0iR8xiC4qfH7b9S2VeEstigUvfmZEb--h9_6xL4SNLQ_S/pub?embedded=true"
}



class BlogService {
  getBlogPost(pageUrl) {
    return axios
      .get(pageUrl, { headers: authHeader() });
  }

}

export default new BlogService();