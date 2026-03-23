use crate::{models::{ProjectProp, Image},
            services::{register_new_project_in_preferences, init_a_new_project, init_a_existent_project}};

#[tauri::command]
pub fn init_new_project(data: ProjectProp) -> Result<Vec<Image>,String> {
    match init_a_new_project(&data) {
        Ok(images) => {
            match register_new_project_in_preferences(data){
                Ok(()) => return Ok(images),
                Err(error) => return Err(error.to_string())
            };
        }
        Err(error) => return Err(error.to_string())
    };
}
#[tauri::command]
pub fn init_exist_project(data: ProjectProp) -> Result<Vec<Image>,String> {
    match init_a_existent_project(&data){
        Ok(images) => {
            return Ok(images)
        }
        Err(error) => return Err(error.to_string())
    };
}

