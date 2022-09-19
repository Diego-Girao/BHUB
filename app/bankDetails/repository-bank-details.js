class BankDetailsRepository {
  constructor(dataBase) {
    this.dataBase = dataBase;
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async findAll() {
    const sqlBankDetails =
      "select * from bank_details";
    let bankDetails = null;
    let connection = null;
    try {
      connection = await this.dataBase.getConnection();
      const dataBankDetails = await connection.query(sqlBankDetails);
      bankDetails = [...dataBankDetails];
    } catch (error) {
      console.log("não foi possível conectar", error);
    } finally {
      connection && connection.end();
    }
    return bankDetails;
  }
  async findById(id) {
    const sql = "select * from bank_details where id_cliente = ?";
    const params = [id];
    let bankDetails = null;
    let connection = null;
    try {
      connection = await this.dataBase.getConnection();
      const data = await connection.query(sql, params);
      const rows = [...data];
      if (rows.length > 0) {
        bankDetails = rows[0];
      }
    } catch (error) {
      console.log("Falha ao buscar os dados");
      throw error;
    } finally {
      connection && connection.end();
    }
    return bankDetails;
  }

  async insert(bankDetails) {
    const sql =
      "insert into bank_details(banco, agencia, conta, id_cliente) values (?,?,?,?)";
    const params = [
      bankDetails.banco,
      bankDetails.agencia,
      bankDetails.conta,
      bankDetails.id_cliente,
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

  async update(bankDetails) {
    const sql =
      "update bank_details set banco = ?, agencia = ?, conta = ? where id_cliente = ?";
    const params = [
      bankDetails.banco,
      bankDetails.agencia,
      bankDetails.conta,
      bankDetails.id_cliente,
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
    const sql = "delete from bank_details where id_cliente = ?";
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

module.exports = BankDetailsRepository;
