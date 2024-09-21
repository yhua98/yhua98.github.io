import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import vue from "@astrojs/vue";
import react from "@astrojs/react";

import Unocss from 'unocss/astro'



// https://astro.build/config
export default defineConfig({
  integrations: [icon(), vue(), react(),Unocss(
    {
      injectReset: true,
    }
  )],
  devToolbar: {
    enabled: false
  }
});