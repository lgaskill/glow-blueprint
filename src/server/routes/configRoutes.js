const ConfigModel = require("../models/config");

// Get the active config
exports.get = async (req, res) => {
  try {
    const config = await ConfigModel.findOne({ active: true });
    if (!config) {
      return res.status(400).send("Active config not found");
    }

    res.status(200).send(config);
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to get config");
  }
};

// POST config
exports.create = async (req, res) => {
  const config = req.body;
  if (!config) {
    return res.status(400).send("Invalid request format");
  }

  let configModel;
  try {
    configModel = new ConfigModel(config);
  } catch (err) {
    res.status(400).send("Invalid blog post format");
  }

  // TODO: Inactivate any other active configs
  try {
    const created = await configModel.save();
    !!created
      ? res.status(202).send(created)
      : res.status(500).send("Failed to create config");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create config");
  }
};

// PATCH Config
exports.update = async (req, res) => {
  const configId = req.params.id;
  const configUpdate = req.body;
  if (!configId || !configUpdate) {
    return res.status(400).send("Invalid request format");
  }

  // Get the active config
  try {
    const config = await ConfigModel.findOne({ _id: configId });
    if (!config) {
      return res.status(400).send("Intended config not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to update config");
  }

  try {
    const result = await ConfigModel.updateOne({ _id: configId }, configUpdate);
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Failed to update config");
  }
};
