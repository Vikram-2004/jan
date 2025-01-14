import { rmdir } from "fs/promises";
import { resolve, join } from "path";
import { manifest, extract } from "pacote";
import * as Arborist from "@npmcli/arborist";

import { pluginsPath } from "./globals";

/**
 * An NPM package that can be used as a Pluggable Electron plugin.
 * Used to hold all the information and functions necessary to handle the plugin lifecycle.
 */
class Plugin {
  /**
   * @property {string} origin Original specification provided to fetch the package.
   * @property {Object} installOptions Options provided to pacote when fetching the manifest.
   * @property {name} name The name of the plugin as defined in the manifest.
   * @property {string} url Electron URL where the package can be accessed.
   * @property {string} version Version of the package as defined in the manifest.
   * @property {Array<string>} activationPoints List of {@link ./Execution-API#activationPoints|activation points}.
   * @property {string} main The entry point as defined in the main entry of the manifest.
   * @property {string} description The description of plugin as defined in the manifest.
   * @property {string} icon The icon of plugin as defined in the manifest.
   */
  origin?: string;
  installOptions: any;
  name?: string;
  url?: string;
  version?: string;
  activationPoints?: Array<string>;
  main?: string;
  description?: string;
  icon?: string;

  /** @private */
  _active = false;

  /**
   * @private
   * @property {Object.<string, Function>} #listeners A list of callbacks to be executed when the Plugin is updated.
   */
  listeners: Record<string, (obj: any) => void> = {};

  /**
   * Set installOptions with defaults for options that have not been provided.
   * @param {string} [origin] Original specification provided to fetch the package.
   * @param {Object} [options] Options provided to pacote when fetching the manifest.
   */
  constructor(origin?: string, options = {}) {
    const defaultOpts = {
      version: false,
      fullMetadata: false,
      Arborist,
    };

    this.origin = origin;
    this.installOptions = { ...defaultOpts, ...options };
  }

  /**
   * Package name with version number.
   * @type {string}
   */
  get specifier() {
    return (
      this.origin +
      (this.installOptions.version ? "@" + this.installOptions.version : "")
    );
  }

  /**
   * Whether the plugin should be registered with its activation points.
   * @type {boolean}
   */
  get active() {
    return this._active;
  }

  /**
   * Set Package details based on it's manifest
   * @returns {Promise.<Boolean>} Resolves to true when the action completed
   */
  async getManifest() {
    // Get the package's manifest (package.json object)
    try {
      const mnf = await manifest(this.specifier, this.installOptions);

      // set the Package properties based on the it's manifest
      this.name = mnf.name;
      this.version = mnf.version;
      this.activationPoints = mnf.activationPoints
        ? (mnf.activationPoints as string[])
        : undefined;
      this.main = mnf.main;
      this.description = mnf.description;
      this.icon = mnf.icon as any;
    } catch (error) {
      throw new Error(
        `Package ${this.origin} does not contain a valid manifest: ${error}`
      );
    }

    return true;
  }

  /**
   * Extract plugin to plugins folder.
   * @returns {Promise.<Plugin>} This plugin
   * @private
   */
  async _install() {
    try {
      // import the manifest details
      await this.getManifest();

      // Install the package in a child folder of the given folder
      await extract(
        this.specifier,
        join(pluginsPath ?? "", this.name ?? ""),
        this.installOptions
      );

      if (!Array.isArray(this.activationPoints))
        throw new Error("The plugin does not contain any activation points");

      // Set the url using the custom plugins protocol
      this.url = `plugin://${this.name}/${this.main}`;

      this.emitUpdate();
    } catch (err) {
      // Ensure the plugin is not stored and the folder is removed if the installation fails
      this.setActive(false);
      throw err;
    }

    return [this];
  }

  /**
   * Subscribe to updates of this plugin
   * @param {string} name name of the callback to register
   * @param {callback} cb The function to execute on update
   */
  subscribe(name: string, cb: () => void) {
    this.listeners[name] = cb;
  }

  /**
   * Remove subscription
   * @param {string} name name of the callback to remove
   */
  unsubscribe(name: string) {
    delete this.listeners[name];
  }

  /**
   * Execute listeners
   */
  emitUpdate() {
    for (const cb in this.listeners) {
      this.listeners[cb].call(null, this);
    }
  }

  /**
   * Check for updates and install if available.
   * @param {string} version The version to update to.
   * @returns {boolean} Whether an update was performed.
   */
  async update(version = false) {
    if (await this.isUpdateAvailable()) {
      this.installOptions.version = version;
      await this._install();
      return true;
    }

    return false;
  }

  /**
   * Check if a new version of the plugin is available at the origin.
   * @returns the latest available version if a new version is available or false if not.
   */
  async isUpdateAvailable() {
    if (this.origin) {
      const mnf = await manifest(this.origin);
      return mnf.version !== this.version ? mnf.version : false;
    }
  }

  /**
   * Remove plugin and refresh renderers.
   * @returns {Promise}
   */
  async uninstall() {
    const plgPath = resolve(pluginsPath ?? "", this.name ?? "");
    await rmdir(plgPath, { recursive: true });

    this.emitUpdate();
  }

  /**
   * Set a plugin's active state. This determines if a plugin should be loaded on initialisation.
   * @param {boolean} active State to set _active to
   * @returns {Plugin} This plugin
   */
  setActive(active: boolean) {
    this._active = active;
    this.emitUpdate();
    return this;
  }
}

export default Plugin;
