/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * A utility file to check weather token exist or not
 */

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
