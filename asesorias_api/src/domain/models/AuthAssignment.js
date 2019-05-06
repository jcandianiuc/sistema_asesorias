class Aula {
    constructor(data = {}) {
      this.itemName = data.itemName;
      this.userId = data.userId;
      this.createdAt = data.createdAt;
    }
  }
  
  module.exports = Aula;