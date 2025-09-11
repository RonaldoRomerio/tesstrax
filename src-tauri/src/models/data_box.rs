use std::{
    fmt::{Display, Formatter, Result},
    str::FromStr,
};

struct data_box {
    pub content: Option<String>,
    pub x: i32,
    pub y: i32,
    pub width: i32,
    pub height: i32,
    pub line: Option<i8>,
}

impl Display for data_box {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result {
        write!(
            f,
            "{} {} {} {} {} {}",
            self.content.clone().unwrap_or(String::from(" ").clone()),
            self.x,
            self.y,
            self.width,
            self.height,
            self.line.unwrap_or(0)
        )
    }
}

impl FromStr for data_box {
    type Err = String;

    fn from_str(s: &str) -> std::result::Result<Self, Self::Err> {
        let fragments: Vec<&str> = s.split_whitespace().collect();

        Ok(data_box {
            content: Some(fragments[0].to_string()),
            x: fragments[1].parse::<i32>().map_err(|_| 0)?,
            y: fragments[2].parse::<i32>().map_err(|_| 0),
            width: fragments[3].parse::<i32>().map_err(|_| 0),
            height: fragments[4].parse::<i32>().map_err(|_| 0),
            line: Some(fragments[5].parse::<i8>().map_err(|_| 0)),
        })
    }
}
