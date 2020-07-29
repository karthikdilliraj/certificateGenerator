const { exec } = require("child_process");

document.querySelector("form").addEventListener("submit", (e) => {
  const fileEl = document.querySelector("input[type='file']");
  const password = document.querySelector("input[type='password']").value || "";
  if (!fileEl) return;
  const files = fileEl.files;

  for (const file of files) {
    const fileName = file.name.split(".")[0];
    const filePath = file.path.split("/").slice(0, -1).join("/");
    const script = `cd ${filePath}\nopenssl pkcs12 -in ${file.name} -nocerts -out ${fileName}-encrypted.key -password pass: -passin pass:${password} -passout pass:${password}\nopenssl pkcs12 -in ${file.name} -clcerts -nokeys -out ${fileName}.crt -password pass:`;

    exec(script, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
});
