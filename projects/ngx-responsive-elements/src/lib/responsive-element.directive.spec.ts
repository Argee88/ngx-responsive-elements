import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { ResponsiveElementDirective } from './responsive-element.directive';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <div id="no-size-map" ngxReResponsiveElement></div>
        <div
            id="size-map"
            ngxReResponsiveElement
            [sizeMap]="{ '500': 'medium', '300': 'small', '700': 'large' }"
        ></div>
        <div
            id="size-map-and-default"
            ngxReResponsiveElement
            defaultCssClass="test"
            [sizeMap]="{ '500': 'medium', '300': 'small', '700': 'large' }"
        ></div>
    `,
})
class DirectiveHostComponent {}

describe('ResponsiveElementDirective', () => {
    let fixture: ComponentFixture<DirectiveHostComponent>;
    let directive: ResponsiveElementDirective;
    let sizeMap = null;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DirectiveHostComponent, ResponsiveElementDirective],
        }).compileComponents();
        fixture = TestBed.createComponent(DirectiveHostComponent);
    }));

    it('should create an instance', () => {
        expect(fixture).toBeTruthy();
    });

    describe('should be possible to define a default css class', () => {
        let dEs;
        let dE;
        beforeEach(() => {
            dEs = fixture.debugElement.queryAll(
                By.directive(ResponsiveElementDirective)
            );
            dE = dEs.filter(
                tempDE => tempDE.attributes.id === 'size-map-and-default'
            )[0];
            directive = dE.injector.get(ResponsiveElementDirective);
            directive.defaultCssClass = 'test';
        });
        it('should be possible to define a default css class', () => {
            expect(directive.defaultCssClass).toBe('test');
        });
    });

    describe('onResize', () => {
        let dE;
        let sizeMapValues;
        beforeEach(() => {
            const dEs = fixture.debugElement.queryAll(
                By.directive(ResponsiveElementDirective)
            );
            dE = dEs.filter(tempDE => tempDE.attributes.id === 'size-map')[0];
            directive = dE.injector.get(ResponsiveElementDirective);
            console.log(directive);

            sizeMap = {
                500: 'medium',
                300: 'small',
                700: 'large',
            };
            directive.sizeMap = sizeMap;
            sizeMapValues = Object.values(sizeMap);
        });
        it('should run on directive init', () => {
            spyOn(directive, 'onResize');
            directive.ngOnInit();
            expect(directive.onResize).toHaveBeenCalledWith(null);
        });
        it('should run on window resize event', () => {
            const spyOnResize = spyOn(directive, 'onResize');
            dE.triggerEventHandler('window:resize', null);
            window.dispatchEvent(new Event('resize'));
            expect(spyOnResize).toHaveBeenCalled();
        });
        it('should update the oldCssClass to the newCssClass', () => {
            expect(directive.oldCssClass).toBeNull();
            directive.onResize(null);
            expect(
                sizeMapValues.indexOf(directive.oldCssClass)
            ).toBeGreaterThan(-1);
        });
        it('should remove the oldCssClass before adding the newCssClass', () => {
            expect(directive.oldCssClass).toBeNull();
            directive.oldCssClass = 'test';
            expect(directive.oldCssClass).toBe('test');
            directive.onResize(null);

            let numberOfFoundClasses = 0;
            for (const tempClassName of sizeMapValues) {
                if (dE.nativeElement.classList.contains(tempClassName)) {
                    numberOfFoundClasses++;
                }
            }

            expect(numberOfFoundClasses).toEqual(1);
        });
        it('should not do anything when oldCssClass and newCssClass are the same', () => {
            expect(directive.oldCssClass).toBeNull();
            directive.onResize(null);
            directive.onResize(null);

            let numberOfFoundClasses = 0;
            for (const tempClassName of sizeMapValues) {
                if (dE.nativeElement.classList.contains(tempClassName)) {
                    numberOfFoundClasses++;
                }
            }

            expect(numberOfFoundClasses).toEqual(1);
        });
        it('should not do anything when host element is gone', () => {
            // workaround for private property
            (directive as any).hostElement = null;

            directive.onResize(null);
            expect(directive.oldCssClass).toBeNull();
        });
    });

    describe('recalcClass', () => {
        describe('when no sizeMap is provided', () => {
            beforeEach(() => {
                const dEs = fixture.debugElement.queryAll(
                    By.directive(ResponsiveElementDirective)
                );
                const dE = dEs.filter(
                    tempDE => tempDE.attributes.id === 'no-size-map'
                )[0];
                directive = dE.injector.get(ResponsiveElementDirective);
            });
            it('sizeMap should be null', () => {
                expect(directive.sizeMap).toBeNull();
            });
            it('should return the default css class', () => {
                expect(directive.recalcClass(null)).toBe(
                    directive.defaultCssClass
                );
            });
        });
        describe('when sizeMap is provided', () => {
            beforeEach(() => {
                const dEs = fixture.debugElement.queryAll(
                    By.directive(ResponsiveElementDirective)
                );
                const dE = dEs.filter(
                    tempDE => tempDE.attributes.id === 'size-map'
                )[0];
                directive = dE.injector.get(ResponsiveElementDirective);

                sizeMap = {
                    500: 'medium',
                    300: 'small',
                    700: 'large',
                };
                directive.sizeMap = sizeMap;
            });
            it('sizeMap should be an object', () => {
                expect(typeof directive.sizeMap).toEqual('object');
            });
            it('should return default class, when given value is smaller than smallest sizeMap value', () => {
                expect(directive.recalcClass(100)).toBe(
                    directive.defaultCssClass
                );
            });
            it('should return class name, that has the closest smaller width associated to it', () => {
                expect(directive.recalcClass(350)).toBe(sizeMap['300']);
                expect(directive.recalcClass(499)).toBe(sizeMap['300']);
                expect(directive.recalcClass(500)).toBe(sizeMap['500']);
                expect(directive.recalcClass(600)).toBe(sizeMap['500']);
                expect(directive.recalcClass(699)).toBe(sizeMap['500']);
                expect(directive.recalcClass(700)).toBe(sizeMap['700']);
                expect(directive.recalcClass(1000)).toBe(sizeMap['700']);
            });
        });
    });
});
