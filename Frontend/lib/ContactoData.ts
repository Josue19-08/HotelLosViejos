import { API_URL } from "./services";
import type { ContactoActualizacion, ContactoBase } from "@/types/Contacto";

export async function getContact() {
    const response = await fetch(`${API_URL}/contacto`);
    if (!response.ok) {
        throw new Error(`Error al obtener contacto: ${response.statusText}`);
    }

    return response.json() as Promise<ContactoBase[]>;
}


export async function updateContact(contacto: ContactoActualizacion) {
    const response = await fetch(`${API_URL}/contacto`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contacto),
    });

    if (!response.ok) {
        throw new Error(`Error al actualizar contacto: ${response.statusText}`);
    }

    return response.json() as Promise<ContactoBase>;
}
