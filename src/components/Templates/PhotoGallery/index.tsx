import type { TPhotoGallery } from "./types";

export default function PhotoGallery({key, prevision}: TPhotoGallery) {

    return (
            <div
                key={key}
                className="bg-gray-600 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative aspect-square overflow-hidden flex justify-center items-center">
                    <img src="http://www.feebpr.org.br/images/media/40656790066264305508b0.jpg"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-white text-center">{prevision}</h3>
                </div>
            </div>
    )
}
