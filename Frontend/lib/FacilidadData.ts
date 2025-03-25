import type { FacilidadBase } from "@/types/Facilidad";
import { API_URL } from "./services";

export async function getAllFacilities(): Promise<FacilidadBase[]> {
    const response = await fetch(`${API_URL}/facilidad`);
    
    if (!response.ok) {
        throw new Error(`Error al obtener facilidades: ${response.statusText}`);
    }

    return response.json() as Promise<FacilidadBase[]>;
}