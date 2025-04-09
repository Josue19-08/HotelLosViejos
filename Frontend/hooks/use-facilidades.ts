"use client";

import { useEffect, useState } from "react";
import type { FacilidadBase } from "@/types/Facilidad";
import { getAllFacilities } from "@/lib/FacilidadData";

export const useFacilidad = () => {

    const [facilidades, setFacilidades] = useState<FacilidadBase[]>([]);

    useEffect(() => {
        
        async function fetchData(){
            try {
                const facilidades = await getAllFacilities();
                setFacilidades(facilidades);
            } catch (error) {
                console.error("Error al obtener facilidades:", error);
            }
        }
        fetchData();
    }, []);

    return { facilidades };
}