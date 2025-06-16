import type { GaleriaBase } from "@/types/Galeria";
import { getAllGaleries } from "@/lib/GaleriaData";
import { useEffect, useState } from "react";

export const useGaleria = () => {

    const [galerias, setGalerias] = useState<GaleriaBase[]>([]);

    useEffect(() => {
        async function fecthData() {
            try {
                const galerias = await getAllGaleries();
                setGalerias(galerias);
            } catch (error) {
                console.error("Error al obtener galerias: ", error);
            }
        }
        fecthData();
    }, []);


    return { galerias };

}