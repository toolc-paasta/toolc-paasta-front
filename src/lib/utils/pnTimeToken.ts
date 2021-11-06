export const pnTimeTokenToHHMM = (tt: string | number) => {
   let timetoken = tt;
   if (typeof timetoken === "string") {
      timetoken = parseInt(timetoken);
   }
   var d = new Date(timetoken / 10000);
   return `${d.getHours()}:${d.getMinutes()}`;
};
