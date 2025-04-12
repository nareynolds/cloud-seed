# CloudSeed

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/qXEduB3b4E)

## Generate a library

```sh
npx nx g @nx/js:lib packages/pkg1 --publishable --importPath=@my-org/pkg1
```

## Run tasks

To build the library use:

```sh
npx nx build pkg1
```

To run any task with Nx use:

```sh
npx nx <target> <project-name>
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Versioning and releasing

To version and release the library use

```
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.

[Learn more about Nx release &raquo;](hhttps://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

# How this repo was created

1. Used [Nx Docs](https://nx.dev/getting-started/installation) to create a new Nx Workspace with a PNPM as the package manager: `npx create-nx-workspace --pm pnpm`

2. Publish the repo to Github.

3. Follow the Nx Cloud link in the terminal output to connect the repo to an Nx Cloud organization.

4. In Nx Cloud, on the "Settings/Access Control" page, change the "Default access level" to `none`, and the "Logged in users" access to `read-only`. This is so the only entity that can write to the remote cache is the CI process.

5. Follow the [Nx Cloud Docs](https://nx.dev/ci/recipes/security/access-tokens) to create a CI Access Token for this repo.

6. Follow the [Husky docs](https://typicode.github.io/husky/get-started.html) to install git hooks.

7. Add the most strict rules provided by TS ESLint. [See docs](https://typescript-eslint.io/getting-started/typed-linting/).

# TODO

# Start developing

- Auth with Github: `gh auth login`
- Auth with NxCloud: `nx login`
- Auth with Pulumi: `pulumi login`
- Auth with Pulumi ESC: `esc login`
- Auth with AWS: `aws sso login --sso-session my-sso`
-

# How to create Pulumi Projects

- Create the project with the Pulumi CLI: `pulumi new aws-typescript`
- Make sure the major version of `@types/node` matches the version pinned by Volta in the root package.json file.

```
{
  //...
  "devDependencies": {
    "@types/node": "^20.17.0", //
  }
}

```

- Add `build` and `deploy` scripts to the package.json, and configure Nx dependency and cache strategy.

```
{
  //...
  "scripts": {
    "build": "tsc --build",
    "deploy": "pulumi up --stack dev --yes"
  },
  "nx": {
    "targets": {
      "deploy": {
        "cache": true,
        "dependsOn": [
          "build"
        ]
      }
    }
  }
}
```

- Add an ESLint file to extend the base config.

- Add TS Project reference to the root tsconfig.json to follow Nx best practices for TS modularity and performance

```
{
  //...
  "references": [
    //...
    {
      "path": "./apps/{PROJECT_NAME}"
    }
  ]
}
```

- Refactor the Pulumi-generated tsconfig.json file to make use of the base files in the root. See [Managing TypeScript Packages in Monorepos](https://nx.dev/blog/managing-ts-packages-in-monorepos) and [A New Nx Experience for TypeScript Monorepos and Beyond](https://nx.dev/blog/new-nx-experience-for-typescript-monorepos) to better understand Nx's best practices for TS config.

# TODOs

- Setup ESC to provide AWS creds for `nx deploy bootstrap`
- Setup Github actions to get ESC creds, and move `pulumi up` to there.
- Turn `nx deploy bootstrap` into Nx plugin command
- Create method to auto-select the pulumi stack based on the git branch
- Follow the [Nx Cloud Docs](https://nx.dev/ci/features/distribute-task-execution) enable distributed task execution.
- Figure out how to limit the AWS Role used by ESC to auth with AWS
