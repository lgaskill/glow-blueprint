const UserModel = require("../models/user");

exports.addPurchaseHistoryItem = async ({
  userId,
  itemId,
  name,
  description,
  transactionId
}) => {
  let user;
  try {
    user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }

  const purchaseHistoryItem = {
    itemId,
    name,
    description,
    transactionId,
    createdAt: new Date()
  };

  const purchaseHistory = user.purchaseHistory || [];
  try {
    await UserModel.updateOne(
      { _id: userId },
      { purchaseHistory: [...purchaseHistory, purchaseHistoryItem] }
    );
  } catch (err) {
    console.error(err);
    return false;
  }

  return true;
};
