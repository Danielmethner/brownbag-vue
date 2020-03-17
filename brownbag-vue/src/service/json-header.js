import authHeader from './auth-header';

export default function jsonHeader() {
  let header = authHeader();
  header['content-type'] = 'application/json';
  return header;
}
