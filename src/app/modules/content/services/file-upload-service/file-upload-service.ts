import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, delay, interval, map, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  /*uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const uploadUrl = 'https://example.com/upload'; // Modifica l'URL con il tuo endpoint di upload

    const options = {
      reportProgress: true,
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    return this.http.post(uploadUrl, formData, options);
  }*/

  uploadFile(file: File): Observable<any> {
    const totalChunks = 10; // Simula 10 chunk per il caricamento progressivo
    const totalSize = file.size; // Dimensione totale del file
    let currentProgress = 0; // Progresso corrente del caricamento
    let loadedSoFar = 0; // Carico totale finora

    return interval(1000).pipe(
      take(totalChunks), // Emetti solo il numero di chunk specificato
      map(index => {
        const loadedChunk = totalSize / totalChunks; // Dimensione del chunk
        const randomIncrement = Math.random() * 10 + 1; // Incremento randomico tra 1 e 10
        loadedSoFar += loadedChunk; // Aggiorna il carico totale finora
        currentProgress = Math.min(100, Math.round((loadedSoFar / totalSize) * 100 + randomIncrement)); // Calcola il progresso corrente con incremento randomico
        return { type: 'progress', progress: currentProgress }; // Emessa l'informazione di progresso
      }),
      map(event => {
        // Emessa l'informazione del progresso solo se il caricamento è completato
        if (event.progress === 100) {
          return { ...event, type: 'response' };
        }
        return event;
      })
    );
  }
}
