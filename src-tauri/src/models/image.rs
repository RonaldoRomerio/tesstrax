use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Image{
    pub path : String,
    pub name : String,
    pub extension : String
}