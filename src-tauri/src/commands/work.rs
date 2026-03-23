use image::error;

use crate::{models::DataBox, services::{convert_file_tiff_to_pgn_buf, write_data_box, write_data_text}};

#[tauri::command]
pub fn get_image(path : String) -> Result<Vec<u8>, String>{
    match convert_file_tiff_to_pgn_buf(&path) {
        Ok(buf_image) => return Ok(buf_image),
        Err(error) => return Err(error.to_string())
    };
}
#[tauri::command]
pub fn write_boxes(path : String, data: Vec<DataBox>) -> Result<bool, String>{
    match write_data_box(&path, &data){
        Ok(_) => {
            match write_data_text(&path, &data) {
                Ok(_) => return Ok(true),
                Err(error) => return Err(error.to_string())
            }
        },
        Err(error) => return Err(error.to_string())
    }
}
