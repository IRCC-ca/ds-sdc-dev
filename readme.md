# Compodoc

Documentation Site: [Compodoc](https://compodoc.app/guides/getting-started.html)

# Getting started

1. From the root folder install dev-dependencies:

```sh
cd ds-sdc-dev
npm install
```

2. Compodoc looks for a tsconfig.doc.json file with the location of your component and any files you want to exclude.

```sh
{
  "include": [
    "component-library/component-lib/src/lib/**/*.ts",
    "component-library/component-lib/src/lib/**/**/*.ts",
    "component-library/component-lib/src/lib/shared/**/**/*.ts",
  ],
  "exclude": [
    "src/**/*.spec.ts"
  ]
}
```

3. Launch interactive documentation server with the command below and open the link generated in your terminal:

```sh
npm run compodoc
```

# Project structure
Compodoc starts at the folder level of the tsconfig file provided with -p option.
```
.
├── src
│ ├── app
│ │ ├── app.component.ts
│ │ └── app.module.ts
│ ├── main.ts
│ └── ...
├── tsconfig.app.json
├── tsconfig.doc.json
└── tsconfig.json
```

# Adding developer documentation / comments
Use code comments to clearly explain @Inputs, any mandatory and optional configuration, lifecycle methods or custom methods.

Comments must be ABOVE the relevant @Input or method as such:
```
/**
* FormGroup aggregates the values of each child FormControl into one object, with each control name as the key. It calculates its status by reducing the status values of its children. For example, if one of the controls in a group is invalid, the entire group becomes invalid.
*/
```


