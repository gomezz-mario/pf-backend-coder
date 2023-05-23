import { fileURLToPath } from "url";
import { dirname } from "path";
const _filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(_filename);