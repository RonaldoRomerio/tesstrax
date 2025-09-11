use crate::commands::*;
use tauri::ipc::Invoke;

pub fn get_all() -> impl Fn(Invoke) -> bool {
    tauri::generate_handler![
        init_new_project,
        init_system,
        init_exist_project,
        get_image_to_front
    ]
}
