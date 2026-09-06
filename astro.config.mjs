// @ts-check
import { defineConfig } from 'astro/config';
import localEventsEditor from './integrations/local-events-editor.mjs';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// https://astro.build/config
export default defineConfig({
	site: isGitHubPages ? 'https://ruefmiia.github.io' : undefined,
	base: isGitHubPages ? '/heartbound-archive' : undefined,
	integrations: [localEventsEditor()],
});
