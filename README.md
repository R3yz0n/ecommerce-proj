# Installing pnpm using npm

pnpm is a fast, disk space-efficient package manager. You can install it using npm on various operating systems. Follow the instructions below for your platform.

## Prerequisites

- Ensure you have Node.js and npm installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).

## Installation Steps

### macOS and Linux

1. Open your terminal.
2. Run the following command to install pnpm globally:
   ```bash
   npm install -g pnpm
   ```
3. Verify the installation by checking the pnpm version:
   ```bash
   pnpm --version
   ```

### Windows

1. Open Command Prompt or PowerShell.
2. Run the following command to install pnpm globally:
   ```cmd
   npm install -g pnpm
   ```
3. Verify the installation by checking the pnpm version:
   ```cmd
   pnpm --version
   ```

## Additional Notes

- If you encounter permission issues during installation, you may need to use `sudo` on macOS/Linux:
  ```bash
  sudo npm install -g pnpm
  ```
- On Windows, ensure you run the terminal as an administrator if you face permission issues.

For more details, visit the [pnpm documentation](https://pnpm.io/).

# Project Requirements

This project has specific requirements for Node.js, React, and Next.js versions. Ensure your environment meets these requirements before proceeding.

## Required Versions

- **Node.js**: `^18.0.0`
- **React**: `^19.0.0`
- **Next.js**: `^15.2.4`

## Checking Your Environment

To check your current Node.js version, run:

```bash
node --version
```

To check your npm version, run:

```bash
npm --version
```

If you need to update Node.js, visit the [Node.js official website](https://nodejs.org/) or use a version manager like [nvm](https://github.com/nvm-sh/nvm).

For React and Next.js, ensure the versions in your `package.json` match the required versions listed above.
