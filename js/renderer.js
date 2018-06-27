const fs = require('fs');

function mergeValues(values, content) {
  //merge values with the content
  //cycle over the keys of these values
  //replace all {{key}} with the values object
  for(let key in values) {
    content = content.replace('{{' + key + '}}', values[key]);
  }
  return content;
}

function view(templateName, values, response) {
  let fileContents = fs.readFileSync(`./views/${templateName}.html`).toString();
  fileContents = mergeValues(values, fileContents);
  response.write(fileContents);
}
module.exports.view = view;
