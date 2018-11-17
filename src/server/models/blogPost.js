const yup = require("yup");

exports.schema = yup.object().shape({
  id: yup.string(),
  title: yup.string().required(),
  body: yup.string().required(),
  createdAt: yup.date().default(function() {
    return new Date();
  }),
  lastUpdatedAt: yup.date().default(function() {
    return new Date();
  }),
  category: yup.string().required()
});
