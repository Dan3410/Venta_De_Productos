module.exports = {
  modifyRes: function (res, status, message, data) {
    res.json({
      status: status,
      message: message,
      data: data,
    });
  },
};
