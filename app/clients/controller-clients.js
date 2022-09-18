class ClientController {
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
      .then((clients) => {
        if (clients) {
          response.json(clients);
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
      .then((client) => {
        if (client) {
          response.json(client);
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
      razao_social,
      cnpj,
      telefone,
      endereco,
      faturamento_declarado,
      banco,
      agencia,
      conta
    } = request.body;
    this.repository
      .insert({
        razao_social,
        cnpj,
        telefone,
        endereco,
        faturamento_declarado,
        banco,
        agencia,
        conta
      })
      .then(() => {
        response.sendStatus(201);
      })
      .catch(() => {
        response.sendStatus(500);
      });
  }

  update(request, response) {
    const id = request.params.id;
    const { 
      razao_social,
      cnpj,
      telefone,
      endereco,
      faturamento_declarado,
      banco,
      agencia,
      conta 
    } = request.body;
    this.repository.update({ 
      id, 
      razao_social,
      cnpj,
      telefone,
      endereco,
      faturamento_declarado,
      banco,
      agencia,
      conta
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

module.exports = ClientController;
