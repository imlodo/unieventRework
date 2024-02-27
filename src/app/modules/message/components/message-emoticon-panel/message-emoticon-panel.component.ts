import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'unievent-message-emoticon-panel',
  templateUrl: './message-emoticon-panel.component.html',
  styleUrls: ['./message-emoticon-panel.component.scss']
})
export class MessageEmoticonPanelComponent {
  protected darkMode = true;
  protected emojis = [
    '😊', '😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😉',
    '😊', '😋', '😎', '😍', '😘', '🥰', '😚', '😗', '😙', '😜',
    '😝', '😛', '🤑', '🤗', '🤓', '😎', '🤡', '🥳', '😏', '😒',
    '😓', '😔', '😕', '🙃', '🤔', '🤯', '😲', '😳', '🥺', '😦',
    '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞'
  ];

  // Output dell'emoticon selezionata
  @Output() emojiSelected = new EventEmitter<string>();

  // Gestisce la selezione dell'emoticon
  selectEmoji(emoji: string): void {
    this.emojiSelected.emit(emoji);
  }

}
