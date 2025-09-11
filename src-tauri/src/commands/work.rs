use crate::services::convert_file_tiff_to_pgn_buf;

#[tauri::command]
pub fn get_image_to_front(path : String) -> Result<Vec<u8>, String>{
    match convert_file_tiff_to_pgn_buf(&path) {
        Ok(buf_image) => return Ok(buf_image),
        Err(error) => return Err(error.to_string())
    };
}