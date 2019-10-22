import {
    Directive,
    OnInit,
    Input,
    ElementRef,
    HostListener,
} from '@angular/core';

@Directive({
    selector: '[reResponsiveElement]',
})
export class ResponsiveElementDirective implements OnInit {
    @Input() sizeMap = null;
    defaultCssClass = 'default';
    oldCssClass: string = null;
    constructor(private hostElement: ElementRef) {}

    ngOnInit() {
        this.onResize(null);
    }

    recalcClass(elementSize: number): string {
        if (!this.sizeMap) {
            return this.defaultCssClass;
        }
        const orderedKeys = Object.keys(this.sizeMap);
        const numberOfEntries = orderedKeys.length;
        for (let index = 0; index < numberOfEntries; index++) {
            const minSize = +orderedKeys[index];
            if (index <= numberOfEntries - 2) {
                const maxSize = +orderedKeys[index + 1];
                if (elementSize >= minSize && elementSize < maxSize) {
                    return this.sizeMap[minSize];
                }
            } else if (
                index === numberOfEntries - 1 &&
                elementSize >= minSize
            ) {
                return this.sizeMap[minSize];
            }
        }
        return this.defaultCssClass;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.hostElement && this.hostElement.nativeElement) {
            const newCssClass = this.recalcClass(
                this.hostElement.nativeElement.clientWidth
            );

            if (this.oldCssClass !== newCssClass) {
                if (this.oldCssClass !== null) {
                    this.hostElement.nativeElement.classList.remove(
                        this.oldCssClass
                    );
                }
                this.hostElement.nativeElement.classList.add(newCssClass);
                this.oldCssClass = newCssClass;
            }
        }
    }
}
