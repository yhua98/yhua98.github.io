import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import vue from "@astrojs/vue";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), vue(), react()],
  devToolbar: {
    enabled: false
  }
});