class ClientsRepository {
  constructor(dataBase) {
    this.dataBase = dataBase;
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async findAll() {
    const sqlClients =
      "select * from clients join bank_details where id = id_cliente";
    let clients = null;
    let connection = null;
    try {
      connection = await this.dataBase.getConnection();
      const dataClients = await connection.query(sqlClients);
      clients = [...dataClients];
    } catch (error) {
      console.log("não foi possível conectar", error);
    } finally {
      connection && connection.end();
    }
    return clients;
  }
  async findById(id) {
    const sql = "select * from clients where id = ?";
    const params = [id];
    let client = null;
    let connection = null;
    try {
      connection = await this.dataBase.getConnection();
      const data = await connection.query(sql, params);
      const rows = [...data];
      if (rows.length > 0) {
        client = rows[0];
      }
    } catch (error) {
      console.log("Falha ao buscar os dados");
      throw error;
    } finally {
      connection && connection.end();
    }
    return client;
  }

  async insert(client) {
    const sql =
      "insert into clients(razao_social, cnpj, telefone, endereco, faturamento_declarado) values (?,?,?,?,?)";
    const params = [
      client.razao_social,
      client.cnpj,
      client.telefone,
      client.endereco,
      client.faturamento_declarado,
    ];
    let connection = null;
    let result = null;
    try {
      connection = await this.dataBase.getConnection();
      const { insertId } = await connection.query(sql, params);
      result = insertId;
    } catch (error) {
      console.log("Falha ao buscar os dados");
      throw error;
    } finally {
      connection && connection.end();
    }
    return result;
  }

  async update(client) {
    const sql =
      "update clients set razao_social = ?, cnpj = ?, telefone = ?, endereco = ?, faturamento_declarado = ? where id = ?";
    const params = [
      client.razao_social,
      client.cnpj,
      client.telefone,
      client.endereco,
      client.faturamento_declarado,
      client.id,
    ];
    let ok = false;
    let connection = null;
    try {
      connection = await this.dataBase.getConnection();
      const result = await connection.query(sql, params);
      ok = result.affectedRows > 0;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection && connection.end();
    }
    return ok;
  }
  
  async remove(id) {
    const sql = "delete from clients where id = ?";
    const params = [id];
    let ok = false;
    let connection = null;
    try {
      connection = await this.dataBase.getConnection();
      const result = await connection.query(sql, params);
      ok = result.affectedRows > 0;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection && connection.end();
    }
    return ok;
  }
}

module.exports = ClientsRepository;
