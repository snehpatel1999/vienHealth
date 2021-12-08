import Cookie from "js-cookie";

const cookie = () => {
  const setCookie = (key: string, value: string) => {
    return Cookie.set(key, value, {
      path: "/",
      expires: 60,
      domain: process.env.REACT_APP_PARENT_DOMAIN,
    });
  };

  const getCookie = (key: string) => Cookie.get(key);

  const deleteCookie = (key: string) =>
    Cookie.remove(key, {
      path: "/",
      domain: process.env.REACT_APP_PARENT_DOMAIN,
    });

  return { setCookie, getCookie, deleteCookie };
};

export default cookie;