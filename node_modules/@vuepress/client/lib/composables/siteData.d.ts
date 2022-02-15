import type { SiteData } from '@vuepress/shared';
import type { Ref } from 'vue';
export type { SiteData };
/**
 * Ref wrapper of `SiteData`
 */
export declare type SiteDataRef = Ref<SiteData>;
/**
 * Global site data ref
 */
export declare const siteData: SiteDataRef;
/**
 * Returns the ref of the site data
 */
export declare const useSiteData: () => SiteDataRef;
