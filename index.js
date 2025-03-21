#!/usr/bin/env node
import chalk from "chalk";
import prompts from "prompts";

const result = await prompts([
    {
        name: "projectName",
        type: "text",
        message: "Project name"
    },
    {
        name: "isTS",
        type: "select",
        message: "Language",
        choices: [
            { title: "JavaScript", value: false },
            { title: "TypeScript", value: true },
        ]
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





console.log(chalk.greenBright.bold(JSON.stringify(result)))