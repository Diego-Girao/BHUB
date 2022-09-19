class BankController {
  constructor(repository) {
    this.repository = repository;
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.insert = this.insert.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
  }
  findAll(request, response) {
    this.repository
      .findAll()
      .then((bankDetails) => {
        if (bankDetails) {
          response.json(bankDetails);
        } else {
          response.sendStatus(404);
        }
      })
      .catch((error) => {
        response.sendStatus(500);
      });
  }

  findById(request, response) {
    const id = request.params.id;
    this.repository
      .findById(id)
      .then((bankDetails) => {
        if (bankDetails) {
          response.json(bankDetails);
        } else {
          response.sendStatus(404);
        }
      })
      .catch((e) => {
        console.log(e);
        response.sendStatus(500);
      });
  }
  insert(request, response) {
    const {
      banco,
      agencia,
      conta,
      id_cliente
    } = request.body;
    this.repository
      .insert({
        banco,
        agencia,
        conta,
        id_cliente
      })
      .then(() => {
        response.sendStatus(201);
      })
      .catch(() => {
        response.sendStatus(500);
      });
  }

  update(request, response) {
    const id_cliente = request.params.id;
    const { 
      banco,
      agencia,
      conta
    } = request.body;
    this.repository.update({ 
      banco,
      agencia,
      conta,
      id_cliente
     })
        .then(ok => {
            if (ok) {
                response.sendStatus(204);
            } else {
                response.sendStatus(412);
            }
        })
        .catch((error) => {
            console.log(error);
            response.sendStatus(500);
        })
      }
  remove(request, response) {
    const id = request.params.id;
    this.repository
      .remove(id)
      .then((ok) => {
        if (ok) {
          response.sendStatus(204);
        } else {
          response.sendStatus(404);
        }
      })
      .catch((error) => {
        console.log(error);
        response.sendStatus(500);
      });
  }
}

module.exports = BankController;
