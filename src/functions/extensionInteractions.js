export const checkExtensionReq = () => {
  let queries = window.location.href.split("?");
  queries.splice(0, 1);

  if (!queries || queries.length < 1) return false;

  let data = {};

  for (let i = 0; i < queries.length; i++)
    data[queries[i].split("=")[0]] = queries[i].split("=")[1];

  return data;
};
