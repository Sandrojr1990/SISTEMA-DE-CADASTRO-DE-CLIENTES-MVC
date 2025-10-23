import type { Response } from "express";
import { Cliente } from "../models/Cliente.js";

export class ClienteView {
  mostrarMensagem(mensagem: string): void {
    console.log(mensagem);
  }

  mostrarClientes(clientes: Cliente[], res: Response): void {
    console.log("\n");
    console.log("Lista de Clientes:");
    clientes.forEach((cliente) => {
      console.log(
        `Nome: ${cliente.nome}, Email: ${cliente.email}, Saldo: ${cliente.saldo}`
      );
    });

    res.status(200).json({ success: true, data: clientes });
  }

  mostrarCliente(cliente: Cliente | undefined): void {
    if (cliente) {
      console.log(
        `Cliente encontrado: Nome: ${cliente.nome}, Email: ${cliente.email}, Saldo: ${cliente.saldo}`
      );
    } else {
      console.log("Cliente não encontrado.");
    }
  }
}
