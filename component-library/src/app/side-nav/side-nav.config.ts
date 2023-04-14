import {Injectable} from "@angular/core";
import {ISideNavDataInterface, ItemCategory, ItemType} from "./side-nav.model";

@Injectable({
  providedIn: 'root',
})
export class SideNavConfig {
    /**
        * Loop through an array of navData, translates all the titles and subtitles
        * Sets the default category and type for each right nav subtitle
        * Then use SlugifyPipe to output slugged text, add # to front.
    */
    getRightNavBarConfig(navData: string[]): ISideNavDataInterface[] {
        const rightNavData: ISideNavDataInterface[] = [
            {
                text: 'RightSideNav.OnThisPage',
                type : ItemType.PlainText,
                category : ItemCategory.Title,
                path: ''
            }
        ];
        navData.forEach(data => {
            rightNavData.push(
                {
                    text: data,
                    type : ItemType.Link,
                    category : ItemCategory.slugUrl,
                    path: data
                }
            )
        })
        return rightNavData
    }

    getLeftNavBarConfig() : ISideNavDataInterface[] {
    return [
        {
            text : 'Developers.GetStartedHeading',
            type : ItemType.PlainText,
            category : ItemCategory.Title,
        },
        {
            text : 'Overview.Heading',
            type : ItemType.Link,
            category : ItemCategory.subTitle,
            path: 'ROUTES.overview'
        },
        {
            text : 'Overview.DeveloperHeading',
            type : ItemType.Link,
            category : ItemCategory.subTitle,
            path: 'ROUTES.forDevelopers'
        },
        {
            text : 'Designers.Heading',
            type : ItemType.Link,
            category : ItemCategory.subTitle,
            path: 'ROUTES.forDesigners'
        },
        {
            text : 'LeftSideNav.title.foundation',
            type : ItemType.Link,
            category : ItemCategory.Title,
        },
        {
            text : 'Utilities.Heading',
            type : ItemType.Link,
            category : ItemCategory.subTitle,
            path: 'ROUTES.utilities'
        },
        {
            text : 'LeftSideNav.title.components',
            type : ItemType.Link,
            category : ItemCategory.Title,
        },
        {
            text : 'Buttons.Title',
            type : ItemType.Link,
            category : ItemCategory.subTitle,
            path: 'ROUTES.buttons'
        },
    ]
    }
}
