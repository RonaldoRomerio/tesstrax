use crate::{
    models::{Image, ProjectProp},
    utils::{
        convert_file_to_tiff, copy_file, create_file, create_name_for_tif_image, create_path,
        remove_file, rename_file, verify_and_read_images_in_path, verify_content_path_exists,
        verify_path_exists,
    },
};
use std::io::{Error, ErrorKind};
use std::path::PathBuf;

pub fn init_a_new_project(project: &ProjectProp) -> Result<Vec<Image>, Box<dyn std::error::Error>> {
    let _ = verify_if_project_paths_exists(&project);

    let mut images_in_base_path = verify_content_in_base_and_output_path(&project)?;

    let _ = convert_file_to_tiff_or_rename(images_in_base_path, project);

    images_in_base_path = return_image_from_output_after_convert_process(&project)?;

    return Ok(images_in_base_path);
}

pub fn init_a_existent_project(project: &ProjectProp) -> Result<Vec<Image>, Error> {
    let _ = verify_if_project_paths_exists(&project);
    let images_in_base_path = return_image_from_output_after_convert_process(&project)?;
    return Ok(images_in_base_path);
}

fn return_image_from_output_after_convert_process(
    project: &ProjectProp,
) -> Result<Vec<Image>, Error> {
    let output_path = if project.check_path_project {
        &project
            .output_path_photos
            .as_ref()
            .unwrap_or(&String::from(""))
            .clone()
    } else {
        &project.base_path_photos
    };

    match verify_content_path_exists(&output_path) {
        Ok(()) => {
            let mut images_in_base_path: Vec<Image> = verify_and_read_images_in_path(&output_path)?;
            images_in_base_path = images_in_base_path
                .into_iter()
                .filter(|i| i.extension == "TIF")
                .collect();
            create_box_an_txt_file(&images_in_base_path)?;
            return Ok(images_in_base_path);
        }
        Err(error) => return Err(error),
    }
}
fn verify_if_project_paths_exists(project: &ProjectProp) -> Result<(), Error> {
    match verify_path_exists(&project.base_path_photos) {
        Ok(_) => {}
        Err(_) => {}
    };

    if project.check_path_project {
        let output_path_project = project
            .output_path_photos
            .as_ref()
            .unwrap_or(&String::from(""))
            .clone();

        match verify_path_exists(&output_path_project) {
            Ok(_exists) => return Ok(()),
            Err(_error) => {
                match create_path(&output_path_project) {
                    Ok(()) => return Ok(()),
                    Err(error) => return Err(error),
                };
            }
        }
    }

    return Ok(());
}

fn verify_content_in_base_and_output_path(project: &ProjectProp) -> Result<Vec<Image>, Error> {
    if project.check_path_project {
        let output_path_project = project
            .output_path_photos
            .as_ref()
            .unwrap_or(&project.base_path_photos)
            .clone();

        match verify_content_path_exists(&output_path_project) {
            Ok(()) => {
                return Err(Error::new(
                    ErrorKind::PermissionDenied,
                    "Já existem arquivos na pasta",
                ))
            }
            Err(_error) => {}
        }
    }

    match verify_content_path_exists(&project.base_path_photos) {
        Ok(()) => {
            let images_in_base_path = verify_and_read_images_in_path(&project.base_path_photos)?;
            return Ok(images_in_base_path);
        }
        Err(error) => return Err(error),
    }
}

fn create_box_an_txt_file(images_list: &Vec<Image>) -> Result<(), Error> {
    for image in images_list {
        create_file(&image.path.replace(".tif", ".box"))?;
        create_file(&image.path.replace(".tif", ".gt.txt"))?;
    }
    Ok(())
}

fn convert_file_to_tiff_or_rename(
    images_in_base_path: Vec<Image>,
    project: &ProjectProp,
) -> Result<(), Error> {
    for (index, actual_image) in images_in_base_path.iter().enumerate() {
        let actual_image_name = create_name_for_tif_image(&project.project_name, index);
        let input_path = &project.base_path_photos;
        let output_path = &project
            .output_path_photos
            .as_ref()
            .unwrap_or(&String::from(""))
            .clone();

        let mut input_path_image = PathBuf::from(input_path);
        input_path_image.push(&actual_image.name);

        let mut output_path_image = PathBuf::from(
            if project.check_path_project { output_path } 
            else {input_path}
        );
            output_path_image.push(actual_image_name);

        let output_path_image_str = output_path_image.to_string_lossy().to_string();
        let input_path_image_str = input_path_image.to_string_lossy().to_string();

        if actual_image.extension == "TIF" {
            match copy_or_move_image(
                &input_path_image_str,
                &output_path_image_str,
                project.check_path_project.clone(),
            ) {
                Ok(()) => {},
                Err(error) => return Err(error)
            };
        } else {
            match convert_file_to_tiff(&input_path_image_str, &output_path_image_str) {
                Ok(_) => {
                    if !project.check_path_project {
                        remove_file(&actual_image.path)?;
                    }
                },
                Err(_) => return Err(Error::new(ErrorKind::Interrupted, "Não foi possível converter arquivo"))
            }
        }
    }
    Ok(())
}

pub fn copy_or_move_image(
    input_path_image: &str,
    output_path_image: &str,
    check_path_project: bool,
) -> Result<(), Error> {
    if check_path_project {
        let _ = copy_file(input_path_image, output_path_image)?;
    } else {
        let _ = rename_file(input_path_image, output_path_image)?;
    }
    Ok(())
}
