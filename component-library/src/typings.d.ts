/*
 * Extra typings definitions
 */

// Allow .json files imports
declare module '*.json';

// SystemJS module definition
declare let module: NodeModule;
interface NodeModule {
  id: string;
}
