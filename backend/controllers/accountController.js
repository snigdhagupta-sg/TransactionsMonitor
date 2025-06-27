const Account = require("../models/AccountNumber");

exports.addAccountNumber = async (req, res) => {
  try {
    const user_id = req.cookies.user_id;
    const { account_number } = req.body;

    if (!user_id) return res.status(401).json({ message: "Not authenticated" });

    await Account.create({ user_id, account_number });

    res.status(201).json({ success: true, message: "Account added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Could not add account" });
  }
};

exports.deleteAccountNumber = async (req, res) => {
  try {
    const user_id = req.cookies.user_id;
    const { account_number } = req.body;

    if (!user_id) return res.status(401).json({ message: "Not authenticated" });

    await Account.deleteOne({ user_id, account_number });

    res.json({ success: true, message: "Account deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Deletion failed" });
  }
};

exports.getAccountNumbers = async (req, res) => {
  try {
    const user_id = req.cookies.user_id;

    if (!user_id) return res.status(401).json({ message: "Not authenticated" });

    const accounts = await Account.find({ user_id });

    res.json({ success: true, accounts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
