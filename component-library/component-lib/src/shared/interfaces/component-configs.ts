export interface IComponentOutputEvent {
  id: string;
  value: string | boolean;
}

/**
 * For use to construct key value pair for error messages
 * @see ErrorComponent
 */
export interface IErrorPairs {
  key: string;
  errorLOV: string;
}
