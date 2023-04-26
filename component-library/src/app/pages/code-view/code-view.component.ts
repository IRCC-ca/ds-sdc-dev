import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SlugifyPipe } from '../../share/pipe-slugify.pipe';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { TranslatedPageComponent } from '../translated-page-component';
import { ICodeViewerConfig } from '@app/components/code-viewer/code-viewer.component';

@Component({
  selector: 'app-overview',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.scss'],
  providers: [SlugifyPipe]
})
export class codeViewComponent implements OnInit, TranslatedPageComponent {
  currentLanguage: string = '';
  altLangLink = 'codeview'; // ROUTE translation path

  codeViewConfig: ICodeViewerConfig = {
    id: 'code-viewer-demo'
  };

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);
    this.setTabsC();
  }

  getSelected(event: string) {
    console.log(event);
  }

  setTabsB() {
    this.codeViewConfig = {
      id: 'code-viewer-demo',
      selected: 'java',
      openAccordion: true,
      tab: [
        {
          id: 'java',
          title: 'Java',
          value: `
        public class Test {

          public static void main(String[] args){
        
            System.out.println("Looooooooooooooooooooooooooooooooooooooooooooooooooooooooonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng string");
          
          }
        }`
        },
        {
          id: 'rust',
          title: 'Rust',
          value: `
        use std::slice;

        fn main() {
            let some_vector = vec![1, 2, 3, 4];
        
            let pointer = some_vector.as_ptr();
            let length = some_vector.len();
        
            unsafe {
                let my_slice: &[u32] = slice::from_raw_parts(pointer, length);
        
                assert_eq!(some_vector.as_slice(), my_slice);
           }
        }`
        },
        {
          id: 'SWIFT',
          title: 'SWIFT',
          value: `
        struct Player {
          var name: String
          var highScore: Int = 0
          var history: [Int] = []
      
          init(_ name: String) {
              self.name = name
          }
        }
        
        
        extension Player {
            mutating func updateScore(_ newScore: Int) {
                history.append(newScore)
                if highScore < newScore {
                    print("\(newScore)! A new high score for \(name)! 🎉")
                    highScore = newScore
                }
            }
        }
        
        var player = Player("Tomas")
        player.updateScore(50)`
        }
      ]
    };
  }

  setTabsC() {
    this.codeViewConfig = {
      id: 'code-viewer-demo',
      openAccordion: true,
      selected: 'html',
      tab: [
        {
          id: 'html',
          title: 'HTML',
          value: `
  <ircc-cl-lib-tabs [config]="qaTabs"></ircc-cl-lib-tabs>
  `
        },
        {
          id: 'ts',
          title: 'TypeScript',
          value: `
  import { ITabNavConfig} from 'ircc-ds-angular-component-library';
  //...

  qaTabs: ITabNavConfig = {
    id: 'tab-id',
    tab: [
      { id: 'tab1', title: 'Tab1', value: 'this is a string' },
      { id: 'tab2', title: 'Tab2', value: 'this is a string' }
    ]
  };`
        }
      ]
    };
  }
}
