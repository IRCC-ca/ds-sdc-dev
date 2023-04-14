export interface TranslatedPageComponent {
  /**
   * ROUTE translation path
   *
   * Please include the following in ngOnInit hook function.
   * ```
   * this.lang.setAltLangLink(this.altLangLink);
   * ```
   */
  altLangLink: string;
}
