const express = require("express");
const router = express.Router();
const Clients = require("../modeles/clients");

//Route qui obitent une liste de tout les clients
router.get("/api/clients", (requete, reponse) => {
    Clients.getClients((err, clients) => {
        if (err) throw err;
        reponse.json(clients);
    }, 250); // 250 = limit
});

router.get("/api/clients/:filter", (requete, reponse) => {
    Clients.getClientsByFilter(
        requete.params.filter,
        (err, clients) => {
          if (err) throw err;
          reponse.json(clients);
        },
        250
      );
})

// Route qui permet d'obtenir un client
router.get("/api/clients/:id", (requete, reponse) => {
    Clients.getClientsById(requete.params.id, (err, clients) => {
        if (err) throw err;
        reponse.json(clients);
    });
});

// Route qui creer un nouveau client
router.post("/api/clients", (requete, reponse) => {
    let newClient = requete.body;
    Clients.ajoutClients(newClient, (err, clients) => {
        if (err) throw err;
        reponse.json(clients);
    });
});

// Route qui delete un client
router.delete("/api/clients/:id", (requete, reponse) => {
    Clients.deleteUnClient(requete.params.id, (err, clients) => {
        if (err) throw err;
        reponse.json(clients);
    });
});

// Route qui modifie un client
router.put("/api/clients/:telephone", (requete, reponse) => {
    let newClient = requete.body;
    Clients.modifierUnClient(requete.params.telephone, newClient, (err, clients) => {
        if (err) throw err;
        reponse.json(clients);
    });
});


module.exports = router;