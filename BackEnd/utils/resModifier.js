module.exports = {
  modifyRes: function (res, code, message, data) {
    res.status(code).json({
      message: message,
      data: data,
    });
  },

  sendClientError: function(res,code){
    res.status(code).send()
  },

  sendErrorServer: function (res) {
    res.status(500).send();
  },
};
