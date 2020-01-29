import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Observable } from "rxjs";
import { BingSearchResponse } from "../models/bingSearchResponse";
import { AzureHttpClient } from "./azureHttpClient";
import { map, catchError } from "rxjs/operators"
import { ComputerVisionResponse, ComputerVisionRequest } from '../models/computerVisionResponse'

@Injectable()
export class CognitiveService {

  bingSearchUrl = 'https://imagesearchsaro.cognitiveservices.azure.com/bing/v7.0/images/search';
  computerVisionUrl = 'https://imagedetectionsaro.cognitiveservices.azure.com/vision/v2.0/analyze/';

  bingSearchAPIKey = '7a377995949743fab8b3f1fe829b29f0';
  computerVisionAPIKey = '63f86b75a4414ecdbd6abab5358ce22a';

  constructor(private http: AzureHttpClient) { }

  SearchImages(searchTerm: string): Observable<BingSearchResponse> {
    return this.http.get(this.bingSearchUrl +'?q='+searchTerm, this.bingSearchAPIKey )
      .pipe
      (map
        (res => res.json() as BingSearchResponse),
      catchError(this.handleError.bind(this))
      );
  }

  analyzeImage(request: ComputerVisionRequest): Observable<ComputerVisionResponse> {
    return this.http.post(this.computerVisionUrl + '?visualFeatures=Description,Tags,Faces',
      this.computerVisionAPIKey, request)
      .pipe(map(
        response => response.json() as ComputerVisionResponse),
        catchError(this.handleError.bind(this.handleError))
      );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
