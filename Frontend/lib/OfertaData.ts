import { OfertaActualizacion, OfertaBase, OfertaRegistro } from "@/types/Oferta";
import { API_URL } from "./services";

export async function getAllOffers(): Promise<OfertaBase[]> {
    const response = await fetch(`${API_URL}/oferta`);

    if (!response.ok) {
        throw new Error(`Error al obtener ofertas: ${response.statusText}`);
    }

    return response.json() as Promise<OfertaBase[]>;
}

export async function updateOffer(oferta: OfertaActualizacion) : Promise<boolean> {
    const response = await fetch(`${API_URL}/oferta`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(oferta),
    });

    if (!response.ok) {
        throw new Error(`Error al actualizar la oferta: ${response.statusText}`);
    }

    const result = await response.json();
    return result as boolean;
}

export async function registerOffer(oferta: OfertaRegistro): Promise<boolean> {
    const response = await fetch(`${API_URL}/oferta`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(oferta),
    });

    if (!response.ok) {
        throw new Error(`Error al registrar la oferta: ${response.statusText}`);
    }

    const result = await response.json();
    return result as boolean;
}

export async function deleteOffer(id: number): Promise<boolean> {
    const response = await fetch(`${API_URL}/oferta/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Error al eliminar la oferta: ${response.statusText}`);
    }

    const result = await response.json();
    return result as boolean;
}