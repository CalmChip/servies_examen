const mongoose = require("mongoose");

// Schema des clients dans mongo DB
let schemaClients = mongoose.Schema({
  _id: { type: String, required: true },
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  telephone: { type: String, required: true },
  date: { type: Date, required: true },
});

let Clients = (module.exports = mongoose.model("clients", schemaClients));

// API pour obtenir tout les clients
module.exports.getClients = (callback, limit) => {
    Clients.find(callback).limit(limit);
};

// API pour obtenir un client via le ID
module.exports.getClientsById = (idClient, callback) => {
  let filtre = { _id: idClient };
  Clients.findById(filtre, callback);
};

// API pour obtenir un client via son telephhone
module.exports.getClientsByFilter = (filter, callback, limit) => {
    Clients.find({ telephone: filter  }, callback) 
    .limit(limit)
};

// API pour ajouter un clients, date creer automatic
module.exports.ajoutClients = (client, callback) => {
    client.date = Date.now();
  Clients.create(client, callback);
};

// API pour delete un client
module.exports.deleteUnClient = (telClient, callback) => {
  let query = { telephone: telClient };
  Clients.deleteOne(query, callback);
};

// API pour modifier un client
module.exports.modifierUnClient = (query, newClient, callback) => {
  let filtre = { telephone: query };
  let options = {};
  let nouveauClient = {
    nom: newClient.nom,
    adresse: newClient.adresse,
    date: Date.now(), 
    telephone: newClient.telephone,
  };
  Clients.findOneAndUpdate(filtre, nouveauClient, options, callback);
};