import express, { Router } from "express";
import { ClienteController } from "./controllers/ClienteController.js";
import { ClienteView } from "./views/ClienteView.js";

const app = express();
const port = 3000;
const router = Router();
const view = new ClienteView();
const controller = new ClienteController(view);

// Configuração do express
app.use(express.json());

// Rotas
router.get("/clientes", (req, res) => controller.listarClientes(req, res));
router.post("/clientes", (req, res) => {
  const { nome, email, saldo } = req.body;
  controller.cadastrarCliente(nome, email, saldo);
  res.status(201).json({ message: "Cliente cadastrado com sucesso" });
});

// Exemplos de uso (você pode remover após testar)
controller.cadastrarCliente("Sandro", "Sandro@gmail.com", 5000);
controller.cadastrarCliente("Yago", "Yago@gmail.com", 3000);

controller.transferirValor("Sandro@gmail.com", "Yago@gmail.com", 500);

controller.buscarClientePorEmail("Sandro@gmail.com");

app.use("/api", router);

app
  .listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  })
  .on("error", (error) => {
    console.log(`Erro ao iniciar servidor: ${error}`);
  });
