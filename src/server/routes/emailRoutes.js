const mailChimpService = require("../services/mailChimpService");

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
    await mailChimpService.subscribe(req.params.id, email);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }

  res.status(204).send();
};

/**
 * Subscribe email address to mail chimp list
 * @param id list id
 */
exports.mc_tag = async (req, res) => {
  const { list_id, email } = req.body;
  if (!email || !list_id) {
    return res.status(400).send("Invalid request format");
  }

  //
  // First, determine if they're subscribed
  //
  let member = null;
  try {
    member = await mailChimpService.getMember(list_id, email);
  } catch (err) {
    // 404's are expected for unsubscibed users
    const error = JSON.parse(err);
    if (error.status !== 404) {
      console.error(error);
      return res.status(500).send();
    }
  }

  if (!member) {
    // Subscribe them first
    try {
      await mailChimpService.subscribe(list_id, email);
    } catch (err) {
      console.error(err);
      return res.status(500).send();
    }
  }

  //  Tag 'em
  try {
    await mailChimpService.addTag(list_id, email, "Group Enrolled");
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }

  res.status(204).send();
};
