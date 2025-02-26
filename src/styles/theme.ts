import { definePreset } from "@primeuix/themes"
import PrimeVueTheme from "@primeuix/themes/aura"
import type { PrimeVueConfiguration } from "primevue"

const primaryColor = "zinc"
const secondaryColor = "emerald"

export const MyPreset = definePreset(PrimeVueTheme, {
  semantic: {
    primary: {
      50: `{${primaryColor}.50}`,
      100: `{${primaryColor}.100}`,
      200: `{${primaryColor}.200}`,
      300: `{${primaryColor}.300}`,
      400: `{${primaryColor}.400}`,
      500: `{${primaryColor}.500}`,
      600: `{${primaryColor}.600}`,
      700: `{${primaryColor}.700}`,
      800: `{${primaryColor}.800}`,
      900: `{${primaryColor}.900}`,
      950: `{${primaryColor}.950}`,
    },
    secondary: {
      50: `{${secondaryColor}.50}`,
      100: `{${secondaryColor}.100}`,
      200: `{${secondaryColor}.200}`,
      300: `{${secondaryColor}.300}`,
      400: `{${secondaryColor}.400}`,
      500: `{${secondaryColor}.500}`,
      600: `{${secondaryColor}.600}`,
      700: `{${secondaryColor}.700}`,
      800: `{${secondaryColor}.800}`,
      900: `{${secondaryColor}.900}`,
      950: `{${secondaryColor}.950}`,
    },
    colorScheme: {
      light: {
        primary: {
          color: "{primary.950}",
          contrastColor: "#ffffff",
          hoverColor: "{primary.800}",
          activeColor: "{primary.700}",
        },
        secondary: { color: "{secondary.700}" },
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
        secondary: { color: "{secondary.500}" },
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
    // darkModeSelector: ".dark-mode",
  },
}
