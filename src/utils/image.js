export const getAvatar = (avatar = "") => {
  if (avatar?.includes("http")) return avatar;

  return "https://cdn-icons-png.freepik.com/512/3607/3607444.png";
};
