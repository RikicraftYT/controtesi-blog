// Percorsi del progetto: le sorgenti stanno in sorgenti/, il sito generato in sito/
// (accanto a sorgenti/, escluso da git: lo pubblica la GitHub Action).

import path from "node:path";
import { fileURLToPath } from "node:url";

export const SORGENTI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const CONTENUTI = path.join(SORGENTI, "contenuti");
export const USCITA = path.resolve(SORGENTI, "..", "sito");
