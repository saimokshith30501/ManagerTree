class Api_Response {
    constructor(success, err,data) {
      this.success = success;
      this.err = err;
      this.data = data;
    }
  }

  module.exports=Api_Response