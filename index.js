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
        name: "addVuetify",
        type: "select",
        message: "What is your sex?",
        choices: [
            { title: "Yes", value: true},
            { title: "No", value: false}
        ]
    }
])