module.exports = {
    createSuccess: (data) => ({ status: "success", data }),
    createError: (message) => ({ status: "error", message }),
  };
  