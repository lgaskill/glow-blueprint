const PageViewModel = require("../models/pageView");

exports.registerPageView = async ({ pageId, pageName, userId }) => {
  pageView = new PageViewModel({ pageId, pageName, userId });

  let created;
  try {
    created = await pageView.save();
  } catch (err) {
    console.error("Failed to register view event", err);
    return;
  }

  if (!created) {
    console.error("No View Event created", err);
  }
};
