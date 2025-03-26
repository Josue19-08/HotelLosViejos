import { API_URL } from "./services";
import type { GaleriaBase } from "@/types/Galeria";

export async function getAllGaleries() {
    const response = await fetch(`${API_URL}/galeria`);
    console.log(response);
    if (!response.ok) {
        throw new Error(`Error al obtener galerias: ${response.statusText}`);
    }

    return response.json() as Promise<GaleriaBase[]>;
}
