use std::{
    fmt::{Display, Formatter, Result},
    str::FromStr,
};
use serde::{Deserialize};

#[derive(Debug, Deserialize)]
pub struct DataBox {
    pub content: Option<String>,
    pub x_min: i32,
    pub y_min: i32,
    pub x_max: i32,
    pub y_max: i32,
    pub line: Option<i8>
}

impl Display for DataBox {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        write!(
            f,
            "{} {} {} {} {} {}",
            self.content.clone().unwrap_or(String::from(" ").clone()),
            self.x_min,
            self.y_min,
            self.x_max,
            self.y_max,
            self.line.unwrap_or(0)
        )
    }
}

impl FromStr for DataBox {
    type Err = String;

    fn from_str(s: &str) -> std::result::Result<Self, Self::Err> {
        let fragments: Vec<&str> = s.split_whitespace().collect();

        Ok(DataBox {
            content: Some(fragments[0].to_string()),
            x_min: fragments[1].parse::<i32>().unwrap_or(0),
            y_min: fragments[2].parse::<i32>().unwrap_or(0),
            x_max: fragments[3].parse::<i32>().unwrap_or(0),
            y_max: fragments[4].parse::<i32>().unwrap_or(0),
            line: Some(fragments[5].parse::<i8>().unwrap_or(0))
        })
    }
}
