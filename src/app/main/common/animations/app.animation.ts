import { animate, state, style, transition, trigger } from "@angular/animations";

export const appAnimation = [
    trigger('slideInOut', [
        state('0', style({
            height: '0px',
            opacity: '0',
            overflow: 'hidden'
        })),
        state('1', style({
            height: '*',
            opacity: '1',
            overflow: 'hidden'
        })),
        transition('1 => 0', animate('300ms ease-out')),
        transition('0 => 1', animate('300ms ease-in'))
    ])

];