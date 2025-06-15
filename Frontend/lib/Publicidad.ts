
import { PublicidadRegistro, PublicidadActualizacion, PublicidadLectura } from "@/types/Publicidad";
import { API_URL } from "./services";

export async function getAllAds(): Promise<PublicidadLectura[]> {
    const response = await fetch(`${API_URL}/publicidad`);

    if (!response.ok) {
        throw new Error(`Error al obtener publicidad: ${response.statusText}`);
    }

    return response.json() as Promise<PublicidadLectura[]>;
}

export async function registerAd(ad: PublicidadRegistro): Promise<boolean> {
    const response = await fetch(`${API_URL}/publicidad`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ad),
    });

    if (!response.ok) {
        throw new Error(`Error al registrar publicidad: ${response.statusText}`);
    }

    return await response.json() as boolean;
}

export async function updateAd(ad: PublicidadActualizacion): Promise<boolean> {
    const response = await fetch(`${API_URL}/publicidad`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ad),
    });

    if (!response.ok) {
        throw new Error(`Error al actualizar publicidad: ${response.statusText}`);
    }

    return await response.json() as boolean;
}

export async function deleteAd(id: number): Promise<boolean> {
    const response = await fetch(`${API_URL}/publicidad/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Error al eliminar publicidad: ${response.statusText}`);
    }

    return await response.json() as boolean;
}
