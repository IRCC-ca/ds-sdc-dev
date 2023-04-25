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
    private lang: LangSwitchService,
    private slugify: SlugifyPipe
  ) {
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit(): void {
    this.lang.setAltLangLink(this.altLangLink);
    this.setTabsA();
  }

  setTabsA() {
    this.codeViewConfig = {
      id: 'code-viewer-demo',
      openAccordion: true,
      selected: 'rust',
      tab: [
        {
          id: 'java',
          title: 'Java',
          value: `public class Test {

          public static void main(String[] args){
        
             System.out.println("Looooooooooooooooooooooooooooooooooooooooooooooooooooooooonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng string");
          
          }
        }`
        },
        {
          id: 'rust',
          title: 'Rust',
          value: `use std::slice;

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
          value: `extension Player {
            mutating func updateScore(_ newScore: Int) {
                history.append(newScore)
                if highScore < newScore {
                    print("\(newScore)! A new high score for \(name)! 🎉")
                    highScore = newScore
                }
            }
        }
        
        player.updateScore(50)`
        }
      ]
    };
  }

  setTabsB() {
    this.codeViewConfig = {
      id: 'code-viewer-demo',
      openAccordion: true,
      selected: 'lorem',
      tab: [
        { id: 'lorem', title: 'Lorem', value: 'Lorem' },
        { id: 'ipsum', title: 'Ipsum', value: 'Ipsum' }
      ]
    };
  }

  setTabsC() {
    this.codeViewConfig = {
      id: 'code-viewer-demo',
      openAccordion: true,
      selected: 'lorem',
      tab: [
        { id: 'lorem', title: 'Lorem', value: 'I am a text change' },
        { id: 'ipsum', title: 'Ipsum', value: 'Ipsum' }
      ]
    };
  }
}
