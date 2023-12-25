const pagination = (pageNumber) => {
  const page = {
    limit: 10,
    skip: (pageNumber - 1) * 10,
  };
  return page;
};
export default pagination;
