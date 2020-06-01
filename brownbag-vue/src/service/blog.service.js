import axios from 'axios';
import authHeader from './auth-header';

export const PAGE_URL = {
  TECH_STACK: "https://docs.google.com/document/d/e/2PACX-1vT8K-A700Va1Yh2_b4Iqz26IOV7o8lPmZn-Uz1MeTGXf8vnbm39XlSj7IhxJB9LVWGsFhXik_gxcCYC/pub?embedded=true",
}



class BlogService {
  getBlogPost(pageUrl) {
    return axios
      .get(pageUrl, { headers: authHeader() });
  }

}

export default new BlogService();