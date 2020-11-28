// const vectors = importAll(require.context('../assets/vectors', false, /\.(svg)$/));

const importAll = (r) => {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};
module.exports = importAll(
  require.context("../assets/vectors", false, /\.(svg)$/)
);
