import http from '@/api/http';

export default () => {
  return new Promise((resolve, reject) => {
    http.get("/api/settings/company").then(({ data: data }) => {
      resolve(data)
    }).catch(reject)
  });
};
