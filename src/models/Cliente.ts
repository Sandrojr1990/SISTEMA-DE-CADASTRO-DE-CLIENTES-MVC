import type { ICliente } from "../interfaces/ICliente.js";

export class Cliente implements ICliente {
    constructor(
        public nome: string,
        public email: string,
        public saldo: string
    ) {}
}