use serde::{Serialize, Deserialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct ProjectProp{
    pub project_name: String,
    pub base_path_photos: String,
    pub output_path_photos: Option<String>,
    pub check_path_project: bool
}