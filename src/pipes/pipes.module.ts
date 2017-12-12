import { NgModule } from '@angular/core';
import { YoutubePipe } from './youtube/youtube';
import { ArtListPipe } from './artlist/artlist';
import { ArtOpenListPipe } from './artlist/artopenlist';

import { TimetoDatePipe } from './time/timetodate';
import { ArtTicketListPipe } from './artlist/artotickerlist';
import { ArtMyTicketPipe } from './artlist/artmyticket';



//ArtListPipe
@NgModule({
    declarations: [YoutubePipe, ArtListPipe, ArtOpenListPipe, TimetoDatePipe, ArtTicketListPipe, ArtMyTicketPipe],
	imports: [],
    exports: [YoutubePipe, ArtListPipe, ArtOpenListPipe, TimetoDatePipe, ArtTicketListPipe, ArtMyTicketPipe]
})
export class PipesModule {}
