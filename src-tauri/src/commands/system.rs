use crate::{models::{Preferences},
            services::{read_preferences, verify_if_preferences_exists_or_create}
};

#[tauri::command]
pub fn init_system() -> Result<Preferences, String>{
    match verify_if_preferences_exists_or_create(){
        Ok(()) => {
            let preferences = read_preferences();
            return Ok(preferences);
        }
        Err(error ) => return Err(error.to_string())
    }
    
    
}