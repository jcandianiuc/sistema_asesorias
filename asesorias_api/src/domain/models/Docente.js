
class Docente {
  constructor(data = {}) {
    this.id = data.id;
    this.uuid = data.uuid;
    this.createdBy = data.createdBy;
    this.createdAt = data.createdAt;
  }

}

module.exports = Docente;
