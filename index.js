const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path"); // Import path module
const { Triangle, Circle, Square } = require("./lib/shapes");

function generateSVG({ text, textColor, shape, shapeColor }) {
  const shapes = { Triangle, Circle, Square };
  const ShapeClass = shapes[shape];
  const shapeInstance = new ShapeClass();
  shapeInstance.setColor(shapeColor);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      ${shapeInstance.render()}
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;
}

function promptUser() {
  inquirer
    .prompt([
      { type: "input", name: "text", message: "Enter up to 3 characters for the logo text:", validate: (input) => input.length <= 3 || "Text must be 3 characters or fewer!" },
      { type: "input", name: "textColor", message: "Enter a text color (keyword or hex):" },
      { type: "list", name: "shape", message: "Choose a shape:", choices: ["Triangle", "Circle", "Square"] },
      { type: "input", name: "shapeColor", message: "Enter a shape color (keyword or hex):" },
    ])
    .then((answers) => {
      const svgContent = generateSVG(answers);
      
      // Define the file path for the examples folder
      const filePath = path.join(__dirname, "examples", "logo.svg");

      // Write the SVG file to the examples folder
      fs.writeFileSync(filePath, svgContent);
      console.log(`Generated ${filePath}`);
    })
    .catch((error) => console.error(error));
}

promptUser();
