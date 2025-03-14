use clap::{Parser};
use dialoguer::{theme::ColorfulTheme, Select};
use indicatif::{ProgressBar, ProgressStyle};
use std::fs;
use std::process::Command;
use std::path::Path;

#[derive(Parser)]
#[command(name = "create-ronin")]
#[command(about = "Create a new web project with Ronin templates", long_about = None)]
struct Cli {}

fn main() {
    print_ascii_logo();

    let _cli = Cli::parse();

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

    let template_paths = vec![
        "templates/react-ronin-modal",
        "templates/next-ronin-modal", // Add correct path if available
    ];

    let selected_template = template_paths[selection];

    fetch_and_copy_template(
        "https://github.com/roninbuilders/ronin-cli.git",
        selected_template,
        "new-project",
    );

    println!("\n✅ Template downloaded! Next steps:");
    println!("  cd new-project");
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

    let full_template_path = format!("{}/{}", temp_repo_dir, template_path);
    
    if !Path::new(&full_template_path).exists() {
        println!("❌ Template not found: {}", full_template_path);
        return;
    }

    println!("📂 Copying template to `{}`...", destination);
    pb.set_message("Copying files...");

    // Create destination folder
    fs::create_dir_all(destination).unwrap();

    for entry in fs::read_dir(&full_template_path).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();
        let dest_path = Path::new(destination).join(entry.file_name());

        if path.is_dir() {
            fs::create_dir_all(&dest_path).unwrap();
        } else {
            fs::copy(&path, &dest_path).unwrap();
        }
    }

    pb.finish_with_message("✅ Template copied!");

    println!("🧹 Cleaning up...");
    fs::remove_dir_all(temp_repo_dir).unwrap();
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
