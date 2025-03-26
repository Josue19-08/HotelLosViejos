import { API_URL } from "./services";
import type { ContactoBase } from "@/types/Contacto";

export async function getContact() {
    const response = await fetch(`${API_URL}/contacto`);
    if (!response.ok) {
        throw new Error(`Error al obtener contacto: ${response.statusText}`);
    }

    return response.json() as Promise<ContactoBase[]>;
}