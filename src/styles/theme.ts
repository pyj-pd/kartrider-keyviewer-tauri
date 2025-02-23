import { definePreset } from "@primeuix/themes"
import PrimeVueTheme from "@primeuix/themes/lara"
import type { PrimeVueConfiguration } from "primevue"

export const MyPreset = definePreset(PrimeVueTheme, {
  semantic: {
    primary: {
      50: "{neutral.50}",
      100: "{neutral.100}",
      200: "{neutral.200}",
      300: "{neutral.300}",
      400: "{neutral.400}",
      500: "{neutral.500}",
      600: "{neutral.600}",
      700: "{neutral.700}",
      800: "{neutral.800}",
      900: "{neutral.900}",
      950: "{neutral.950}",
    },
    colorScheme: {
      light: {
        primary: {
          color: "{primary.950}",
          contrastColor: "#ffffff",
          hoverColor: "{primary.800}",
          activeColor: "{primary.700}",
        },
        highlight: {
          background: "{primary.950}",
          focusBackground: "{primary.700}",
          color: "#ffffff",
          focusColor: "#ffffff",
        },
      },
      dark: {
        primary: {
          color: "{primary.50}",
          contrastColor: "{primary.950}",
          hoverColor: "{primary.200}",
          activeColor: "{primary.300}",
        },
        highlight: {
          background: "{primary.50}",
          focusBackground: "{primary.300}",
          color: "{primary.950}",
          focusColor: "{primary.950}",
        },
      },
    },
  },
})

export const theme: PrimeVueConfiguration["theme"] = {
  preset: MyPreset,
  options: {
    darkModeSelector: ".dark-mode",
  },
}
