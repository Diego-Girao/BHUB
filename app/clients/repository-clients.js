class ClientsRepository {
  constructor(dataBase) {
    this.dataBase = dataBase;
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.findByEmail = this.findByEmail.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async findAll() {
    const sql = 'select * from clients';
    let clients = null;
    let connection = null;
    try {
      connection = await this.dataBase.getConnection();
      const data = await connection.query(sql);
      clients = [...data]

    } catch (error) {
      console.log('errooooorrrrororor');

    }finally{
      connection && connection.end(); 
    }
    return clients;
  }
  findById(id) {

  }
  findByEmail(email) {

  }
  insert(client) {

  }
  update(id, client) {

  }
  delete(id) {

  }
}

module.exports = ClientsRepository;