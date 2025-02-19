import { definePresetEps, setImporter } from "./import-manager";

export * as extensionPoints from "./extension-manager";
export * as activationPoints from "./activation-manager";
export * as plugins from "./facade";
export { default as ExtensionPoint } from "./ExtensionPoint";

// eslint-disable-next-line no-undef
if (typeof window !== "undefined" && !window.pluggableElectronIpc)
  console.warn(
    "Facade is not registered in preload. Facade functions will throw an error if used."
  );

/**
 * Set the renderer options for Pluggable Electron. Should be called before any other Pluggable Electron function in the renderer
 * @param {Object} options
 * @param {importer} options.importer The callback function used to import the plugin entry points.
 * @param {Boolean|null} [options.presetEPs=false] Whether the Extension Points have been predefined (true),
 * can be created on the fly(false) or should not be provided through the input at all (null).
 * @returns {void}
 */
export function setup(options: any) {
  setImporter(options.importer);
  definePresetEps(options.presetEPs);
}
