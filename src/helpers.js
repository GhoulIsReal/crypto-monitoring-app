export const getItemsPerPage = (page) => {
  return [6 * (page - 1), 6 * page];
};
