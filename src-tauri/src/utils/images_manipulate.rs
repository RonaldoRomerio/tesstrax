use std::{fs::read, io::{Cursor, Error}, path::Path};

use image::{ImageFormat, ImageReader};

pub fn convert_file_to_tiff(input_path_image: &str, output_path_image: &str) -> Result<(), Box<dyn std::error::Error>> {

    let img = ImageReader::open(input_path_image)?.decode()?; // Decodifica para ImageBuffer

    img.save_with_format(output_path_image, ImageFormat::Tiff)?;

    Ok(())
}

pub fn create_name_for_tif_image(project_name: &String, index: usize) -> String {
    let model_name = project_name.replace(" ", "");
    let name_file = format!("{}.exp{}.tif", model_name, index);
    return name_file;
}



pub fn convert_tif_to_png_bytes(input_path_image: &str) -> Result<Vec<u8>, Box<dyn std::error::Error>> {
    let img = image::ImageReader::open(input_path_image)
        .map_err(|e| e.to_string())?
        .with_guessed_format()?
        .decode()?;

    let mut buf = Cursor::new(Vec::new());
    img.write_to(&mut buf, image::ImageFormat::Png)
        .map_err(|e: image::ImageError| e.to_string())?;

    Ok(buf.into_inner())
}

pub fn tif_to_bytes(path: &str) -> Result<Vec<u8>, Error> {
    // Lê o arquivo inteiro para um vetor de bytes
    let bytes: Vec<u8> = read(path)?;
    return Ok(bytes);
}