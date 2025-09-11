use std::{
    ffi::OsStr, fs::{create_dir, read_dir}, io::{Error, ErrorKind}, path::{Path, PathBuf}
};

use crate::models::Image;

pub fn verify_path_exists(pathstr: &str) -> Result<(), Error> {
    let path = Path::new(pathstr);

    if !path.exists() {
        return Err(Error::new(ErrorKind::NotFound, "Pasta não encontrado"));
    }

    return Ok(());
}
pub fn create_path(path: &str) -> Result<(), Error> {
    create_dir(path)?;
    return Ok(())
}

pub fn verify_content_path_exists(path: &str) -> Result<(), Error> {
    println!("caminho aqui{}", &path);
    match read_dir(path) {
        Ok(mut entries) => {
            if entries.next().is_none() {
                return Err(Error::new(ErrorKind::NotFound, "Pasta Sem arquivos"));
            } else {
                return Ok(());
            }
        }
        Err(_error) => {
            return Err(Error::new(ErrorKind::NotFound, format!("Erro ao ler a pasta {}", path)))
        },
    }
}

pub fn verify_and_read_images_in_path(path: &str) -> Result<Vec<Image>, Error> {
    let mut images_in_path = Vec::<Image>::new();
    const VALID_EXTENSIONS: [&str; 4] = ["PNG", "JPEG", "JPG", "TIF"];

    match read_dir(path) {
        Ok(entries) => {
            for entry in entries.flatten() {
                if entry.path().is_file() {
                    let path_image = entry.path().to_string_lossy().into_owned();
                    let image_name = entry.file_name().to_string_lossy().into_owned();
                    let extension_images = entry
                        .path()
                        .extension()
                        .unwrap_or(OsStr::new(""))
                        .to_string_lossy()
                        .into_owned()
                        .to_uppercase();
                    if VALID_EXTENSIONS.contains(&extension_images.as_str()) {
                        images_in_path.push(Image {
                            path: path_image,
                            name: image_name,
                            extension: extension_images,
                        });
                    }
                }
            }
        }
        Err(_error) => return Err(Error::new(ErrorKind::NotFound, format!("Erro ao ler a pasta{}", path))),
    }

    return Ok(images_in_path);
}

pub fn get_temp_png_path(filename: &str) -> PathBuf {
    let mut path = std::env::temp_dir(); // pega o temp do OS
    path.push(filename);
    path
}