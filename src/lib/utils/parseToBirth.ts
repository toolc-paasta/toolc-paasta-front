export default (birth: string) => {
   return birth.slice(0, 4) + "-" + birth.slice(4, 6) + "-" + birth.slice(6, 8);
};
