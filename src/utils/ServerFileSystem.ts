import { invoke } from "@tauri-apps/api/core";
import type { Image } from "@/context/types";
export async function readBufFile(imagem: Image): Promise<string> {
    let bufImage = await invoke<Uint8Array>("get_image_to_front",
        { path: imagem.path }
    );
    const base64String = btoa(
        String.fromCharCode(...bufImage)
    );

    const dataUrl = `data:image/png;base64,${base64String}`;

    return dataUrl;
}

export async function readFileAndConvertToBox(){
    
}