import { API_URL } from "./services";
import type { Administrador } from "@/types/Administrador";

export async function login(administrador: Administrador): Promise<boolean> {
    const response = await fetch(`${API_URL}/administrador/autenticar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(administrador),
    });

    if (!response.ok) {
        throw new Error(`Error al autenticar al administraodr: ${response.statusText}`);
    }

    const result = await response.json();
    return result as boolean;
}