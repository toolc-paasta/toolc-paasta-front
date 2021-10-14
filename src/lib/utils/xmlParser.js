import XMLParser from "react-xml-parser";

export const apiXmlToObject = (xml) => {
   const json = new XMLParser().parseFromString(xml);
   const names = json.getElementsByTagName("crname").map((item) => item.value);
   const tels = json.getElementsByTagName("crtel").map((item) => item.value);
   const addr = json.getElementsByTagName("craddr").map((item) => item.value);

   const ret = names.map((item, idx) => ({
      centerName: item,
      tel: tels[idx],
      address: addr[idx],
   }));

   return ret.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
   });
};
