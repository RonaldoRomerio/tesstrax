use std::{io::Error, 
        path::PathBuf};

use crate::{models::{Preferences, ProjectProp},
            utils::file_manipulate::{read_file, verify_if_file_exists, write_in_file}};
use serde_json::{from_str, to_string_pretty};

pub fn read_preferences() -> Preferences {
    
    let content_file = read_file(&capture_path_preferences()).unwrap_or_else(|_| "".to_string());

    let json_preferences: Preferences =
        from_str(&content_file).expect("Erro ao converter preferências");
        
    return json_preferences;
}

pub fn register_new_project_in_preferences(mut dados: ProjectProp) -> Result<(), Error>{
    let preferences = read_preferences();
    if !dados.check_path_project {
        dados.output_path_photos = Some(dados.base_path_photos.clone());
    }
    
    let arrange_preferences = self::order_recent_list(preferences, dados);

    match write_preferences(arrange_preferences){
        Ok(()) => Ok(()),
        Err(error) => Err(error)
    }
}

pub fn verify_if_preferences_exists_or_create() -> Result<(), Error> {
    match verify_if_file_exists(&capture_path_preferences()) {
        Ok(()) => return Ok(()),
        Err(_) => {
            let inicial_preferences = Preferences::default();
            match self::write_preferences(inicial_preferences) {
                Ok(()) => return Ok(()),
                Err(error) => return Err(error)
            }
        }
    }
}

pub fn write_preferences(preferences: Preferences) -> Result<(), Error> {
    let string_preferences = to_string_pretty(&preferences).expect("Erro ao converter para Json");
    match write_in_file(&capture_path_preferences(), string_preferences.as_bytes(), true) {
        Ok(_) => return Ok(()),
        Err(error) => return Err(error)
    }
}

fn order_recent_list(mut preferences: Preferences, dados: ProjectProp) -> Preferences {
    for i in (0..9).rev() {
        preferences.recent_list[i + 1] = preferences.recent_list[i].take();
    }
    preferences.recent_list[0] = Some(dados);
    return preferences;
}

fn capture_path_preferences() -> String{
    let mut path_preferences = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    path_preferences.push("src");
    path_preferences.push("preferences.json");

    return path_preferences.to_string_lossy().to_string();
}