const UserGroupModel = require("../models/userGroup");
const request = require("request");

const MC_API_KEY = process.env.MC_API_KEY;

TODO: create endpoint to add / tag subscribter
TODO: Store mailchimp subsciber id on users

/**
 * Subscribe email address to mail chimp list
 * @param id list id
 */
exports.mc_subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email || !req.params.id) {
    return res.status(400).send("Invalid request format");
  }

  try {
    await new Promise((resolve, reject) => {
      request.post(
        `https://us20.api.mailchimp.com/3.0/lists/${req.params.id}/members`,
        {
          json: { email_address: email, status: "subscribed" },
          auth: {
            user: "gb",
            pass: MC_API_KEY
          }
        },
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            resolve(body);
          } else {
            reject(body);
          }
        }
      );
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }

  res.status(204).send();
};

/**
 * Get all userGroups
 * @param type (OPTIONAL) filter down to groups of type "EMAIL" or "USER"
 */
exports.getAll = async (req, res) => {
  const { type } = req.query;
  if (type && type !== "USER" && type !== "EMAIL") {
    return res.status(400).send("Invalid type");
  }

  let userGroups;
  try {
    userGroups = await UserGroupModel.find(type ? { type } : {});
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to get user groups");
  }
  res.status(200).send(userGroups);
};

/**
 * Get user group by id
 * @param id *Required*
 */
exports.getById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send();
  }

  try {
    const userGroup = await UserGroupModel.findOne({ _id: req.params.id });
    if (!userGroup) {
      return res.status(404).send("User Group " + id + " not found");
    }

    res.status(200).send(userGroup);
  } catch (err) {
    res.status(500).send("Failed to get user group " + id);
  }
};

/**
 * Create new user group
 */
exports.create = async (req, res) => {
  const userGroup = req.body;
  if (!userGroup || !userGroup.name || !userGroup.type) {
    return res.status(400).send("Invalid request format");
  }

  let userGroupModel;
  try {
    userGroupModel = new UserGroupModel(userGroup);
    await userGroupModel.validate();
  } catch (err) {
    return res.status(400).send("Invalid user group format");
  }

  try {
    const created = await userGroupModel.save();
    !!created
      ? res.status(202).send(created)
      : res.status(500).send("Failed to create user group");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create user group");
  }
};

/**
 * Update Group
 * @param id *Required*
 *
 */
exports.update = async (req, res) => {
  const id = req.params.id;
  const patchObj = req.body;
  if (!id || !patchObj) {
    return res.status(400).send("Invalid request format");
  }

  // First, make sure the thing exists
  try {
    const userGroup = await UserGroupModel.findOne({ _id: id });
    if (!userGroup) {
      return res.status(404).send("Intended user group not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Failed to validate user group");
  }

  try {
    await UserGroupModel.updateOne({ _id: id }, patchObj);
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Failed to update user group");
  }
};

/**
 * Delete (deprecate) group
 * @param id *Required*
 */
exports.delete = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Id is required");
  }

  // First, make sure the thing exists
  let userGroup;
  try {
    userGroup = await UserGroupModel.findOne({ _id: id });
    if (!userGroup) {
      return res.status(404).send("Intended user group not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Failed to validate user group");
  }

  try {
    await UserGroupModel.updateOne({ _id: id }, { deprecated: true });
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Failed to delete user group");
  }
};

/**
 * Add value to group
 * @param id *Required*
 * @param body {value: ""}
 */
exports.addValue = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  if (!id) {
    return res.status(400).send("Id is required");
  }

  // First, make sure the thing exists
  let userGroup;
  try {
    userGroup = await UserGroupModel.findOne({ _id: id });
    if (!userGroup) {
      return res.status(404).send("Intended user group not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Failed to validate user group");
  }

  // Ensure this won't create a duplicate
  if (userGroup.values.find(v => v.value === value) !== undefined) {
    return res.status(304).send("Nothing to update");
  }

  const userGroupValue = { value, createdAt: new Date() };
  try {
    await UserGroupModel.updateOne(
      { _id: id },
      { values: [...userGroup.values, userGroupValue] }
    );
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Failed to delete user group");
  }
};

/**
 * Remove value from group
 * @param id *Required*
 * @param body {value: ""}
 */
exports.removeValue = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  if (!id) {
    return res.status(400).send("Id is required");
  }

  // First, make sure the thing exists
  let userGroup;
  try {
    userGroup = await UserGroupModel.findOne({ _id: id });
    if (!userGroup) {
      return res.status(404).send("Intended user group not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Failed to add value to user group");
  }

  // Ensure the specified value exists
  if (!userGroup.values.find(v => v.value === value) === undefined) {
    return res.status(304).send("Nothing to update");
  }

  try {
    await UserGroupModel.updateOne(
      { _id: id },
      { values: userGroup.values.filter(v => v.value !== value) }
    );
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Failed to remove value from user group");
  }
};
