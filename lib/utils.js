export function parseData(key, data) {
  const parse = data?.filter((item) => item.key?.includes(key));
  return parse;
}

export function parseProductName(product) {
  const title = product?.item_group_name?.split("Sepatu Compass ")[1]?.trim();
  return title;
}

export const getDataFromMeta = (data) =>
  data?.reduce((acc, item) => {
    if (item.reference) {
      if (item.reference.fields) {
        acc[item.key] = item.reference.fields?.reduce((acc, item) => {
          if (item.reference) {
            acc[item.key] = item.reference;
          } else if (item.type === "rich_text_field") {
            acc[item.key] = JSON.parse(item.value);
          } else if (item.references) {
            acc[item.key] = item.references.nodes;
          } else {
            acc[item.key] = item.value;
          }
          return acc;
        }, {});
      } else {
        acc[item.key] = item.reference;
      }
    } else if (item.references) {
      acc[item.key] = item.references.nodes;
    } else {
      acc[item.key] = item.value;
    }
    return acc;
  }, {});

export const calculateWarrantyExpired = () => {
  const expiredDate = new Date();
  expiredDate.setMonth(expiredDate.getMonth() + 6); // Six months
  return expiredDate.toISOString();
};

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
