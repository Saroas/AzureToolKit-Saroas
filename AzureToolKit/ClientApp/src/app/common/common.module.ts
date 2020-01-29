import { AzureHttpClient } from "./services/azureHttpClient";
import { CognitiveService } from "./services/cognitive.service";
import { NgModule } from '@angular/core'
import { HttpModule } from "@angular/http";

@NgModule({
  imports: [HttpModule],
  providers: [AzureHttpClient, CognitiveService]
})

export class CommonModule {}
