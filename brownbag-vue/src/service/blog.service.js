import axios from 'axios';
import authHeader from './auth-header';

const PAGES = {
  ARCHITECTURE: "https://docs.google.com/document/d/e/2PACX-1vT8K-A700Va1Yh2_b4Iqz26IOV7o8lPmZn-Uz1MeTGXf8vnbm39XlSj7IhxJB9LVWGsFhXik_gxcCYC/pub?embedded=true",
}



class AssetService {
  getBlogPost(page) {
    return axios
      .get(PAGES[page], { headers: authHeader() });
  }

}

export default new AssetService();