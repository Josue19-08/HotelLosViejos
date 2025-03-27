"use client";

import { useEffect, useState } from "react";
import type { PublicidadBase } from "@/types/Publicidad";
import { getAllPublicidad } from "@/lib/Publicidad";

export const usePublicidad = () => {

    const [publicidades, setPublicidades] = useState<PublicidadBase[]>([]);

    useEffect(() => {

        async function fetchData(){
            try {
                const publicidades = await getAllPublicidad();
                setPublicidades(publicidades);
            } catch (error) {
                console.error("Error al obtener publicidades:", error);
            }
        }
        fetchData();
    }, []);

    return { publicidades};
}