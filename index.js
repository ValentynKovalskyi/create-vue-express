#!/usr/bin/env node
import chalk from "chalk";
import prompts from "prompts";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import path from 'path'
import Handlebars from "handlebars";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const templatesDir = path.join(_dirname, "templates");
const frontendTemplatesDir = path.join(templatesDir, "frontend")
const serverTemplatesDir = path.join(templatesDir, "server")

//TODO: Add validations and initials, handle CLI stopping
const projectData = await prompts([
    {
        name: "projectName",
        type: "text",
        message: "Project name",
        initial: "project-name"
    },
    {
        name: "isTS",
        type: "select",
        message: "Language",
        choices: [
            { title: "JavaScript", value: false },
            { title: "TypeScript", value: true },
        ],
    },
    {
        name: "isMonorepo",
        type: "select",
        message: "Monorepo or separated projects",
        choices: [
            { title: "Monorepo", value: true },
            { title: "Separate", value: false },
        ],
    },
    {
        name: "vuePlugins",
        type: "multiselect",
        message: "Choose Vue plugins",
        choices: [
            { title: "Vue-Router", value: "router"},
            { title: "Pinia State Manager", value: "pinia"},
            { title: "Vuetify UI", value: "vuetify"},
            { title: "I18n", value: "i18n"},
        ]
    },
    {
        name: "expressPlugins",
        type: "multiselect",
        message: "Choose Vue plugins",
        choices: [
            { title: "Helmet", value: "helmet"},
            { title: "Morgan Logger", value: "morgan"},
            { title: "Compression", value: "compression"},
        ]
    }
])

const projectDir = path.join(process.cwd(), projectData.projectName);
const frontendDir = path.join(projectData.projectName, "frontend");
const serverDir = path.join(projectData.projectName, "server");
fs.ensureDirSync(projectDir)

//create vue project
fs.ensureDirSync(frontendDir)
const paths = fs.readdirSync(frontendTemplatesDir, { recursive: true });
console.log(paths)
const files = paths.filter((p) => {
    const isDir = fs.statSync(path.join(frontendTemplatesDir, p)).isDirectory();
    if(isDir) {
        fs.ensureDir(path.join(frontendDir, p));
    }

    return !isDir
})
console.log(files)
files.forEach((file) => {
    const templatePath = path.join(frontendTemplatesDir, file);
    const isHbsTemplate = file.endsWith(".hbs")

    if(isHbsTemplate) {
        const content = fs.readFileSync(templatePath, "utf-8");
        const compiledContent = Handlebars.compile(content)(projectData);
        const outputFile = path.join(frontendDir, file.replace(".hbs", ""));

        fs.writeFileSync(outputFile, compiledContent);
    } else {
        fs.copyFileSync(templatePath, path.join(frontendDir, file));
    }
})

console.log(chalk.greenBright.bold(JSON.stringify(projectData)))