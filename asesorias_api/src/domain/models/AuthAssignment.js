class AuthAssignment {
    constructor(data = {}) {
      this.id = data.id;
      this.itemName = data.itemName;
      this.userId = data.userId;
      this.createdAt = data.createdAt;
    }

    addRole( itemName ) {
      this.itemName = itemName;
    }
  }
  
  module.exports = AuthAssignment;