const HealthHistoryModel = require("../models/healthHistory");
const emailService = require("../services/emailService");

const BOSS_MAMA_EMAIL = process.env.BOSS_MAMA_EMAIL;

/**
 * Get health history by valid auth token
 */
exports.getByToken = async (req, res) => {
  const { payload } = req;

  let healthHistory;
  try {
    healthHistory = await HealthHistoryModel.findOne({ userId: payload.id });
  } catch (err) {
    return res.status(500).send("Failed to get health history");
  }

  res.send(healthHistory);
};

/**
 * ADMIN-ONLY
 * Get health history by user id
 * @param id *Required*
 */
exports.getByUserId = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send();
  }

  try {
    const healthHistory = await HealthHistoryModel.findOne({
      userId: req.params.id
    });
    if (!healthHistory) {
      return res.status(404).send("Health history " + id + " not found");
    }

    res.status(200).send(healthHistory);
  } catch (err) {
    res.status(500).send("Failed to get health history " + id);
  }
};

/**
 * Create new health history for user id
 */
exports.create = async (req, res) => {
  const { id } = req.payload; // Get the user id from the auth token
  const healthHistory = req.body;
  if (!id || !healthHistory) {
    return res.status(400).send("Invalid request format");
  }

  healthHistory.userId = id;

  let healthHistoryModel;
  try {
    healthHistoryModel = new HealthHistoryModel(healthHistory);
    await healthHistoryModel.validate();
  } catch (err) {
    return res.status(400).send("Invalid health history format");
  }

  try {
    const created = await healthHistoryModel.save();
    if (created) {
      // Notify Boss Mama
      emailService.send({
        recipients: [BOSS_MAMA_EMAIL],
        subject: "Health History Created",
        message: `<p><b>${payload.firstName} ${
          payload.lastName
        }</b> has just filled-in their Health History!</p>`
      });
      res.status(202).send(created);
    } else {
      res.status(500).send("Failed to create health history");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create health history");
  }
};

/**
 * Update health history by valid auth token
 */
exports.updateByToken = async (req, res) => {
  const { payload, body } = req;
  if (!body) {
    return res.status(400).send();
  }

  let healthHistory;
  try {
    healthHistory = await HealthHistoryModel.findOne(
      { userId: payload.id },
      { _id: true }
    );
  } catch (err) {
    return res.status(500).send("Failed to get health history");
  }

  if (!healthHistory) {
    return res.status(404).send();
  }

  try {
    HealthHistoryModel.updateOne({ userId: payload.id }, body, (err, data) => {
      if (!err) {
        // Notify Boss Mama
        emailService.send({
          recipients: [BOSS_MAMA_EMAIL],
          subject: "Health History Updated",
          message: `<p><b>${payload.firstName} ${
            payload.lastName
          }</b> has just filled-in their Health History!</p>`
        });
        res.status(204).send();
      } else {
        res.status(500).send("Failed to update health history");
      }
    });
  } catch (err) {
    res.status(500).send("Failed to update health history");
  }
};

/**
 * ADMIN-ONLY
 * Update Health History by id
 * @param id *Required*
 *
 */
exports.updateById = async (req, res) => {
  const id = req.params.id;
  const patchObj = req.body;
  if (!id || !patchObj) {
    return res.status(400).send("Invalid request format");
  }

  // First, make sure the thing exists
  try {
    const healthHistory = await HealthHistoryModel.findOne(
      { _id: id },
      { _id: true }
    );
    if (!healthHistory) {
      return res.status(404).send("Intended health history not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Failed to validate health history");
  }

  try {
    await HealthHistoryModel.updateOne({ _id: id }, patchObj);
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Failed to update health history");
  }
};

/**
 * ADMIN-ONLY
 * Get ALL health histories
 */
exports.getAll = async (req, res) => {
  let healthHistories;
  try {
    healthHistories = await HealthHistoryModel.find({});
  } catch (err) {
    return res.status(500).send("Failed to get health histories");
  }

  res.send(healthHistories);
};
