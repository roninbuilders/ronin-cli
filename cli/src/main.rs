use clap::{Parser};
use dialoguer::{theme::ColorfulTheme, Select, Input};
use indicatif::{ProgressBar, ProgressStyle};
use std::fs;
use std::process::Command;
use std::path::Path;
use fs_extra::dir::{copy, CopyOptions};

#[derive(Parser)]
#[command(name = "create-ronin")]
#[command(about = "Create a new web project with Ronin templates", long_about = None)]
struct Cli {}

fn main() {
    print_ascii_logo();

    let templates = vec![
        "React + Ronin Modal with Wagmi",
        "Next + Ronin Modal with Wagmi",
    ];

    let selection = Select::with_theme(&ColorfulTheme::default())
        .with_prompt("Choose a template")
        .default(0)
        .items(&templates)
        .interact()
        .unwrap();

    let project_name: String = Input::new()
        .with_prompt("Enter project name")
        .allow_empty(true) // Allow user to press Enter
        .interact_text()
        .unwrap();

    // Determine the destination folder
    let destination = if project_name.trim().is_empty() {
        ".".to_string() // Install in root directory
    } else {
        project_name.clone() // Clone to prevent move issues
    };

    let template_paths = vec![
        "templates/react-ronin-modal",
        "templates/next-ronin-modal",
    ];

    let selected_template = template_paths[selection];

    fetch_and_copy_template(
        "https://github.com/roninbuilders/ronin-cli.git",
        selected_template,
        &destination,
    );

    println!("\n✅ Template downloaded! Next steps:");
    if destination != "." {
        println!("  cd {}", destination);
    }
    println!("  pnpm install");
    println!("  pnpm dev");
}

fn fetch_and_copy_template(repo_url: &str, template_path: &str, destination: &str) {
    let temp_repo_dir = "ronin-cli-temp";

    println!("🚀 Cloning template from GitHub...");

    let pb = ProgressBar::new(100);
    pb.set_style(ProgressStyle::default_bar()
        .template("{msg} [{bar:40}] {pos}%")
        .unwrap());
    pb.set_message("Cloning repository...");

    let clone_status = Command::new("git")
        .args(["clone", "--depth=1", repo_url, temp_repo_dir])
        .status();

    pb.finish_with_message("✅ Repository cloned!");

    if clone_status.is_err() {
        println!("❌ Failed to clone repository.");
        return;
    }

    // Run `git clean -fdx` to remove any ignored files in case `.gitignore` is hiding them
    let _ = Command::new("git")
        .args(["-C", temp_repo_dir, "clean", "-fdx"])
        .status();

    let full_template_path = format!("{}/{}", temp_repo_dir, template_path);

    if !Path::new(&full_template_path).exists() {
        println!("❌ Template not found: {}", full_template_path);
        fs::remove_dir_all(temp_repo_dir).unwrap_or_else(|_| println!("⚠️ Warning: Failed to remove temp folder."));
        return;
    }

    println!("📂 Copying template to `{}`...", destination);

    let mut options = CopyOptions::new();
    options.copy_inside = true;

    if let Err(e) = copy(&full_template_path, destination, &options) {
        println!("❌ Failed to copy template: {}", e);
        return;
    }

    println!("🧹 Cleaning up...");
    fs::remove_dir_all(temp_repo_dir).unwrap_or_else(|_| println!("⚠️ Warning: Failed to remove temp folder."));
    println!("✅ Done!");
}

fn print_ascii_logo() {
    let ascii_art = r#"
      ###############################      
     #################################     
     #################################     
     ########*+=============+*########     
     #######=.               .=#######     
     ######*-     :#####:     -*######     
     ######*-     :#####:     -*######     
     ######*-     :#####:     -*######     
     ######*-     :#####:     -*######     
     ######*-               .=*#######     
     ######*-     :#####:    .+#######     
     ######*-     :#####:     -*######     
     ######*-     :#####:     -*######     
     ######*-     :#####:     -*######     
     #######=     :#####:     =#######     
     ########+:   :#####:   :+########     
     ##########*- :#####: -*##########     
       #############################       
         #########################         
           #####################           
              ################             
                ###########                
                  #######                  
    "#;

    println!("{}", ascii_art);
}
