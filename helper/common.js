import fs from 'fs';
import path from "path";


const commonHelper = {
    async deleteFile(filePath) {
        filePath = './' + filePath;
        console.log(filePath);
        if (fs.existsSync(filePath)) { //check file exist
            await fs.unlinkSync(filePath);
        }
    },
    uniqueFilename(file) {
        let uniqueName = "";
        if (file) {
            uniqueName = `${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}${path.extname(file.originalname)}`; //for i.e 3746674586-836534453.png
        }
        return uniqueName;
    },
    convertFilePathSlashes(path) {
        let filePath = path.replace(/\\/g, "/");
        return filePath;
    },
}

export default commonHelper;