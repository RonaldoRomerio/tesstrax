use std::io::Error;

use crate::utils::{tif_to_bytes,convert_tif_to_png_bytes};
pub fn convert_file_tiff_to_pgn_buf(path : &str) -> Result<Vec<u8>, Box<dyn std::error::Error>>{
    match convert_tif_to_png_bytes(&path) {
        Ok(buf_image) => return Ok(buf_image),
        Err(error) => return Err(error)
    }   
}