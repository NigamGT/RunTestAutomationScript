import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

import clipboardy from 'clipboardy';
import fs from "fs-extra";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const clipboardJsonPath = resolve(__dirname, 'cypress/fixtures/clipboard-output.json');

export default defineConfig({
  e2e: {
    specPattern: '**/*.feature',
    supportFile: 'cypress/support/e2e.js',

    async setupNodeEvents(on, config) {
      // try {
      //   await fs.writeJson(clipboardJsonPath, [], { spaces: 2 });
      //   console.log('📄 clipboard-output.json cleared.');
      // } catch (err) {
      //   console.error('❌ Error clearing clipboard-output.json:', err);
      // }

      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      on('task', {
        async saveClipboardEntry() {
          try {
            const text = await clipboardy.read();

            const entry = {
              url: (text.match(/Login URL:\s*(.*)/) ?? [])[1] || '',
              username: (text.match(/Username:\s*(.*)/) ?? [])[1] || '',
              password: (text.match(/Password:\s*(.*)/) ?? [])[1] || '',
              timestamp: new Date().toISOString(),
            };

            let data = [];
            if (await fs.pathExists(clipboardJsonPath)) {
              data = await fs.readJson(clipboardJsonPath);
            }

            data.push(entry);
            await fs.writeJson(clipboardJsonPath, data, { spaces: 2 });

            return entry;
          } catch (err) {
            console.error('❌ Failed to save clipboard entry:', err);
            return null;
          }
        }
      });

      return config;
    },
  },
});
