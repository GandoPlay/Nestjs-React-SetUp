const {exec} = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function createApp() {

  const frontendTemplateDir = path.join(__dirname, 'templates/frontend');
  const backEndTemplateDir = path.join(__dirname, 'templates/backend');
  const frontendDestinationDir = path.join(process.cwd(), 'frontend');
  const backendDestinationDir = path.join(process.cwd(), 'backend');

  try {
    // Copy the template React project to the destination
    await fs.copy(frontendTemplateDir, frontendDestinationDir);
    await fs.copy(backEndTemplateDir, backendDestinationDir);

    console.log('The project is done!');
  } catch (err) {
    console.error('Error creating the app:', err);
  }
}


  try {
    //  exec('npm create vite@latest frontend -- --template react');
    // console.log('Frontend project created successfully.');

    //  exec('npx nest new backend --package-manager npm');
    // console.log('Backend project created successfully.');
  } catch (error) {
    console.error('Error occurred during project setup:', error.message);
  }


if (process.argv[2] === 'project-setup') {
  createApp();
}

module.exports = createApp