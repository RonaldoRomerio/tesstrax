use std::io::Error;

use crate::{
    models::DataBox,
    utils::{convert_tif_to_png_bytes, verify_if_file_exists, write_in_file},
};
pub fn convert_file_tiff_to_pgn_buf(path: &str) -> Result<Vec<u8>, Box<dyn std::error::Error>> {
    match convert_tif_to_png_bytes(&path) {
        Ok(buf_image) => return Ok(buf_image),
        Err(error) => return Err(error),
    }
}
pub fn write_data_box(path: &str, data: &Vec<DataBox>) -> Result<(), Error> {
    let path_box = path.replace(".tiff", ".box");

    let content = data
        .iter()
        .map(|l| l.to_string())
        .collect::<Vec<_>>()
        .join("\n");

    let content_archive = content.as_bytes();

    match verify_if_file_exists(&path_box) {
        Ok(_) => {
            match write_in_file(&path_box, content_archive, true) {
                Ok(_) => return Ok(()),
                Err(error) => return Err(error),
            };
        }
        Err(error) => return Err(error),
    }
}

pub fn write_data_text(path: &str, data: &Vec<DataBox>) -> Result<(), Error> {
    let path_box = path.replace(".tiff", "gt.txt");

    let content = data
        .iter()
        .filter_map(|l| l.content.as_deref())
        .collect::<Vec<_>>()
        .join("");

    let content_archive = content.as_bytes();

    match verify_if_file_exists(&path_box) {
        Ok(_) => {
            match write_in_file(&path_box, content_archive, true) {
                Ok(_) => return Ok(()),
                Err(error) => return Err(error),
            };
        }
        Err(error) => return Err(error),
    }
}
