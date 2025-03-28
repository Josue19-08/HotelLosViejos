import type { PublicidadBase } from "@/types/Publicidad";
import { API_URL } from "./services";

export async function getAllPublicidad(): Promise<PublicidadBase[]> {
    const response = await fetch(`${API_URL}/publicidad`);

    if (!response.ok) {
        throw new Error(`Error al obtener la publicidad: ${response.statusText}`);
    }

    return response.json() as Promise<PublicidadBase[]>;
}