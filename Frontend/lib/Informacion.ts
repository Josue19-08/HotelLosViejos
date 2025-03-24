import { InformacionBase } from "@/types/Informacion";
import { API_URL } from "./services";

export async function getAllInformation(): Promise<InformacionBase[]> {
    const response = await fetch(`${API_URL}/informacion`);
    
    if (!response.ok) {
        throw new Error(`Error al obtener información: ${response.statusText}`);
    }

    return response.json() as Promise<InformacionBase[]>;
}