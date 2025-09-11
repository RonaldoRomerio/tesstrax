use std::{
    fs::{copy, read_to_string, remove_file as remove, rename, File, OpenOptions},
    io::{Error, Write,ErrorKind},
    path::Path,
};

pub fn read_file(path: &str) -> Result<String, Error> {
    let content = read_to_string(path)?;

    return Ok(String::from(content));
}

pub fn verify_if_file_exists(path: &str) -> Result<(),Error> {
    let archive = Path::new(path);

    if archive.exists() && archive.is_file() {
        return Ok(());
    }

    return Err(Error::new(ErrorKind::NotFound, "Arquivo não encontrado"));
}

pub fn create_file(path: &str) -> Result<bool, Error> {
    File::create(path)?;
    return Ok(true);
}

pub fn write_in_file(path: &str, content: &[u8], truncate: bool) -> Result<bool, Error> {
    let mut file = OpenOptions::new()
        .write(true)
        .truncate(truncate)
        .create(true)
        .open(path)?;
    file.write_all(content)?;

    return Ok(true);
}

pub fn rename_file(original_name: &str, new_name: &str) -> Result<(), Error> {
    rename(original_name, new_name)?;
    Ok(())
}

pub fn copy_file(original_name: &str, new_name: &str) -> Result<(), Error> {
    copy(original_name, new_name)?;
    Ok(())
}

pub fn remove_file(path: &str) -> Result<(), Error> {
    remove(path)?;
    println!("Apagou {}", path);
    Ok(())
}
