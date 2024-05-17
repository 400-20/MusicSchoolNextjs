const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function deleteFilesInFolder(folderPath) {
    // Read the contents of the folder
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(`Error reading folder ${folderPath}:`, err);
            return;
        }

        // Iterate over each file/folder in the folder
        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            // PowerShell command to move file to Recycle Bin
            const cmd = `powershell -command "$sh = New-Object -ComObject Shell.Application; $ns = $sh.Namespace(0); $ns.ParseName('${filePath}').InvokeVerb('delete')";`

            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    console.error('Error moving file to Recycle Bin:', err);
                    return;
                }
                console.log(`Moved to Recycle Bin: ${filePath}`);
            });
        });
    });
}

function main() {
    // Specify the folder paths you want to clean
    const foldersToClean = [
        "C:\\Users\\91809\\Desktop\\rt"
        // Include other paths as required
    ];

    // Iterate over each folder and delete files and folders
    foldersToClean.forEach(folder => {
        deleteFilesInFolder(folder);
    });

    // Log the time of execution
    console.log('Cleanup process completed at:', new Date());
}

main();
