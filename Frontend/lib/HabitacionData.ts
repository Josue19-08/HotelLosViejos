import { HabitacionBase, Caracteristica, HabitacionActualizacion,HabitacionRegistro  } from "@/types/Habitacion";
import { API_URL } from "./services";

export async function getAllHabitaciones(): Promise<HabitacionBase[]> {
  const response = await fetch(`${API_URL}/habitacion`);

  if (!response.ok) {
    throw new Error(`Error al obtener habitaciones: ${response.statusText}`);
  }

  return response.json();
}

export async function updateHabitaciones(Habitacion: HabitacionActualizacion): Promise<boolean> {
    const response = await fetch(`${API_URL}/habitacion`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Habitacion),
    });

    if (!response.ok) {
        throw new Error(`Error al actualizar la habitación: ${response.statusText}`);
    }

    const result = await response.json();
    return result as boolean;
}


export async function registerHabitaciones(Habitacion: HabitacionRegistro): Promise<boolean> {
    const response = await fetch(`${API_URL}/habitacion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Habitacion),
    });

    if (!response.ok) {
        throw new Error(`Error al registrar la habitación: ${response.statusText}`);
    }

    const result = await response.json();
    return result as boolean;
}

export async function deleteHabitacion(id: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/habitacion/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Error al eliminar la habitación: ${response.statusText}`);
    }

    const result = await response.json();
    return result as boolean;  // Asumiendo que el servidor devuelve un valor booleano
}

export async function getHabitacionById(id: string): Promise<HabitacionBase | null> {
    const response = await fetch(`${API_URL}/habitacion/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Error al obtener la habitación: ${response.statusText}`);
    }

    const habitacion = await response.json();
    return habitacion as HabitacionBase;  // Asumiendo que HabitacionBase es el tipo que espera la respuesta
}



export async function getAllCaracteristicas(): Promise<Caracteristica[]> {
  const response = await fetch(`${API_URL}/caracteristicas`);

  if (!response.ok) {
    throw new Error(`Error al obtener las caracteristicas: ${response.statusText}`);
  }

  return response.json();
}
