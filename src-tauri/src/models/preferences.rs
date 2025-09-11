use super::{configuration::Configuration, project_prop::ProjectProp};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Preferences {
    pub config: Configuration,
    pub recent_list: [Option<ProjectProp>; 10],
}

impl Preferences {
    pub fn default() -> Self {
        Preferences {
            config: Configuration { tesseract_path: Some(String::from(""))},
            recent_list: [None,None,None,None,None,None,None,None,None,None],
        }
    }
}
