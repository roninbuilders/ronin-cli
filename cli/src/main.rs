use clap::{Parser};
use dialoguer::{theme::ColorfulTheme, Select};
use indicatif::{ProgressBar, ProgressStyle};
use std::io::Cursor;
use reqwest;
use tar::Archive;
use flate2::read::GzDecoder;

#[derive(Parser)]
#[command(name = "create-ronin")]
#[command(about = "Create a new web project with Ronin templates", long_about = None)]
struct Cli {}

fn main() {
    print_ascii_logo(); // Show ASCII art logo

    let _cli = Cli::parse();

    let templates = vec![
        "Next + Ronin Modal with Wagmi",
        "React + Ronin Modal with Wagmi",
    ];

    let selection = Select::with_theme(&ColorfulTheme::default())
        .with_prompt("Choose a template")
        .default(0)
        .items(&templates)
        .interact()
        .unwrap();

    let template_urls = vec![
        "https://github.com/your-repo/react-template/archive/refs/heads/main.tar.gz",
        "https://github.com/your-repo/svelte-template/archive/refs/heads/main.tar.gz",
        "https://github.com/your-repo/solid-template/archive/refs/heads/main.tar.gz",
    ];

    let url = template_urls[selection];

    download_and_extract(url, "new-project");

    println!("✅ Template downloaded! Next steps:");
    println!("  cd new-project");
    println!("  pnpm install");
    println!("  pnpm dev");
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

fn download_and_extract(url: &str, folder_name: &str) {
    let response = reqwest::blocking::get(url).unwrap();
    let mut archive = Archive::new(GzDecoder::new(Cursor::new(response.bytes().unwrap())));

    let pb = ProgressBar::new(100);
    pb.set_style(ProgressStyle::default_bar()
        .template("{msg} [{bar:40}] {pos}%")
        .unwrap());

    pb.set_message("Downloading template...");
    archive.unpack(folder_name).unwrap();
    pb.finish_with_message("✅ Download complete!");

    println!("🎉 Project initialized in `{}`", folder_name);
}
