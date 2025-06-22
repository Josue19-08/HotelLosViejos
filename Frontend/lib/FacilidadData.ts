import { FacilidadActualizacion, FacilidadBase, FacilidadRegistro } from "@/types/Facilidad";
import { API_URL } from "./services";

export async function getAllFacilities(): Promise<FacilidadBase[]> {
    const response = await fetch(`${API_URL}/facilidad`);
    
    if (!response.ok) {
        throw new Error(`Error al obtener facilidades: ${response.statusText}`);
    }

    return response.json() as Promise<FacilidadBase[]>;
}

export async function updateFacilities(facilidad: FacilidadActualizacion): Promise<boolean> {
    const response = await fetch(`${API_URL}/facilidad`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(facilidad),
    });

    if (!response.ok) {
        throw new Error(`Error al actualizar la facilidad: ${response.statusText}`);
    }

    const result = await response.json();
    return result as boolean;
}

export async function registerFacilities(facilidad: FacilidadRegistro): Promise<boolean> {
    const response = await fetch(`${API_URL}/facilidad`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(facilidad),
    });

    if (!response.ok) {
        throw new Error(`Error al registrar la facilidad: ${response.statusText}`);
    }

    const result = await response.json();
    return result as boolean;
}

export async function deleteFacility(id: number): Promise<boolean> {
    const response = await fetch(`${API_URL}/facilidad/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Error al eliminar la facilidad: ${response.statusText}`);
    }

    const result = await response.json();
    return result as boolean;
}
