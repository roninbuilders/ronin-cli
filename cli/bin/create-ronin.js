#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs-extra"; // FIX: Default import for CommonJS module
import { join } from "path";
import inquirer from "inquirer";
import ora from "ora";
import simpleGit from "simple-git";
import chalk from "chalk";

const { existsSync, rmSync, copySync } = fs;

// ASCII Logo Function
const printAsciiLogo = () => {
  console.log(chalk.blue(`
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
  `));
};

// Template Repository Paths
const TEMPLATE_PATHS = {
  "React + Ronin Modal with Wagmi": "templates/react-ronin-modal",
  "Next + Ronin Modal with Wagmi": "templates/next-ronin-modal",
};

const REPO_URL = "https://github.com/roninbuilders/ronin-cli.git";

// Function to clone and copy template
const fetchAndCopyTemplate = async (templatePath, destination) => {
  const git = simpleGit();
  const tempRepoDir = "ronin-cli-temp";
  const spinner = ora(`🚀 Cloning template from GitHub...`).start();

  // Remove old temp directory
  if (existsSync(tempRepoDir)) {
    rmSync(tempRepoDir, { recursive: true, force: true });
  }

  try {
    await git.clone(REPO_URL, tempRepoDir, ["--depth=1"]);
    spinner.succeed(`✅ Repository cloned!`);
  } catch (error) {
    spinner.fail(`❌ Failed to clone repository: ${error.message}`);
    process.exit(1);
  }

  // Remove .git directory to prevent issues
  try {
    rmSync(join(tempRepoDir, ".git"), { recursive: true, force: true });
    execSync(`rm -rf ${join(tempRepoDir, ".git")}`); // Ensure `.git` is removed
  } catch {}

  // Verify template path
  const fullTemplatePath = join(tempRepoDir, templatePath);
  if (!existsSync(fullTemplatePath)) {
    console.error(chalk.red(`❌ Template not found: ${fullTemplatePath}`));
    rmSync(tempRepoDir, { recursive: true, force: true });
    process.exit(1);
  }

  // Copy template files
  console.log(`📂 Copying template to ${chalk.green(destination)}...`);
  try {
    copySync(fullTemplatePath, destination, { overwrite: true });
    console.log(chalk.green(`✅ Template copied successfully!`));
  } catch (error) {
    console.error(chalk.red(`❌ Failed to copy template: ${error.message}`));
    process.exit(1);
  }

  // Clean up temp repo
  rmSync(tempRepoDir, { recursive: true, force: true });
  console.log(chalk.green("🧹 Cleaning up... Done!"));
};

// Main Function
const main = async () => {
  printAsciiLogo();

  // Ask user to select a template
  const { template } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Choose a template:",
      choices: Object.keys(TEMPLATE_PATHS),
    },
  ]);

  // Ask user for project name
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter project name (leave empty to install in current directory):",
      default: "",
    },
  ]);

  // Determine installation path
  const destination = projectName.trim() === "" ? "." : projectName;

  // Fetch and copy template
  await fetchAndCopyTemplate(TEMPLATE_PATHS[template], destination);

  // Install dependencies
  console.log(chalk.yellow(`📦 Installing dependencies...`));
  execSync(`cd ${destination} && pnpm install`, { stdio: "inherit" });

  // Print next steps
  console.log(chalk.blue(`\n✅ Project setup complete! Next steps:`));
  if (destination !== ".") console.log(chalk.green(`  cd ${destination}`));
  console.log(chalk.green(`  pnpm dev`));
};

// Run the CLI
main().catch((error) => {
  console.error(chalk.red(`❌ Error: ${error.message}`));
  process.exit(1);
});
