import type { Request, Response } from "express";
import { Cliente } from "../models/Cliente.js";
import { ClienteView } from "../views/ClienteView.js";

export class ClienteController {
  private clientes: Cliente[] = [];
  private view: ClienteView;

  constructor(view: ClienteView) {
    this.view = view;
  }

  cadastrarCliente(nome: string, email: string, saldo: number): void {
    if (this.clientes.some((cliente) => cliente.email === email)) {
      this.view.mostrarMensagem("Erro: Cliente com este email já existe.");
    }

    const novoCliente = new Cliente(nome, email, saldo);
    this.clientes.push(novoCliente);
    this.view.mostrarMensagem("Cliente cadastrado com sucesso!");
  }

  listarClientes(req: Request, res: Response): void {
    this.view.mostrarClientes(this.clientes, res);
  }

  buscarClientePorEmail(email: string): void {
    const cliente = this.clientes.find((cliente) => cliente.email === email);
    this.view.mostrarCliente(cliente);
  }

  transferirValor(
    emailOrigem: string,
    emailDestino: string,
    valor: number
  ): void {
    const clienteOrigem = this.clientes.find(
      (cliente) => cliente.email === emailOrigem
    );
    const clienteDestino = this.clientes.find(
      (cliente) => cliente.email === emailDestino
    );

    if (!clienteOrigem || !clienteDestino) {
      console.log("Erro: Cliente de origem ou destino não encontrado.");
      return;
    }

    clienteOrigem.saldo -= valor;
    clienteDestino.saldo += valor;

    this.view.mostrarMensagem("Transferência realizada com sucesso!");
  }
}
