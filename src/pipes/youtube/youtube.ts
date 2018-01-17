import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
    name: 'youtube',
})

export class YoutubePipe implements PipeTransform {

    constructor(private dom: DomSanitizer) {

    }

    getID(url) {
        let ID = '';
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        }
        else {
            ID = url;
        }

        return ID;
    }  
    
    getLinkEmbed(url) {
        return `https://www.youtube.com/embed/${this.getID(url)}`;
    }

    transform(value: string, ...args) {
        return this.dom.bypassSecurityTrustResourceUrl(this.getLinkEmbed(value));
    }
}
