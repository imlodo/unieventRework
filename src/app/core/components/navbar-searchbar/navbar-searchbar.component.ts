import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'unievent-navbar-searchbar',
  templateUrl: './navbar-searchbar.component.html',
  styleUrls: ['./navbar-searchbar.component.scss']
})
export class NavbarSearchbarComponent {
  @Input() isMobile: boolean;
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  isInputActive: boolean = false;
  isRecognitionActive: boolean = false;
  recognition: any;
  idleTimer: any;
  inputText: string = "";

  constructor() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true; // Change to true for interim results
      this.recognition.lang = 'it-IT'; // Set language to Italian
      this.recognition.onresult = (event: any) => {
        const interimTranscript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        this.inputText = interimTranscript;

        // Emit final transcript when the result is final
        if (event.results[0].isFinal) {
          this.search(interimTranscript);
        }
      };
      this.recognition.onerror = (event: any) => {
        console.error(event);
        this.isRecognitionActive = false;
      };
      this.recognition.onend = () => {
        console.log('Speech recognition service disconnected');
        this.isRecognitionActive = false;
      };
    } else {
      console.warn('Browser does not support speech recognition');
    }
  }

  checkActive(count: number): void {
    this.isInputActive = count > 0 ? true : false;
  }

  search(value: string): void {
    this.searchEvent.emit(value);
  }

  startVoiceRecognition(): void {
    if (this.recognition) {
      this.recognition.start();
      this.isRecognitionActive = true;
      console.log('Voice recognition started');
    } else {
      console.warn('Voice recognition is not supported in this browser');
    }
  }
}
