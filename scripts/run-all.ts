import { generateDocs } from "./generate-docs";
import { getPlugins } from "./get-plugins";
import { downloadPlugins } from "./download-plugins";

export const runAll = () => {
  const plugins = getPlugins();
  generateDocs(plugins);
  downloadPlugins(plugins);
};

runAll();
