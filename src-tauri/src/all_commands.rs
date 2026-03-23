use crate::commands::*;
use tauri::ipc::Invoke;

pub fn get_all_commands() -> impl Fn(Invoke) -> bool {
    tauri::generate_handler![
        //project
        init_new_project,
        //System
        init_system,
        init_exist_project,
        //Work
        get_image,
        write_boxes
    ]
}
