import { InformacionActualizacion, InformacionBase } from "@/types/Informacion";
import { API_URL } from "./services";

export async function getAllInformation(): Promise<InformacionBase[]> {
    const response = await fetch(`${API_URL}/informacion`);
    
    if (!response.ok) {
        throw new Error(`Error al obtener información: ${response.statusText}`);
    }

    return response.json() as Promise<InformacionBase[]>;
}

export async function updateInformation(information:InformacionActualizacion){
    const response = await fetch(`${API_URL}/informacion`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(information),
    });

    if (!response.ok) {
        throw new Error(`Error al actualizar información: ${response.statusText}`);
    }

    return response.json() as Promise<InformacionBase[]>;
}