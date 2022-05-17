module.exports = {
  port: 3200,
  productionPort: 3100,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
