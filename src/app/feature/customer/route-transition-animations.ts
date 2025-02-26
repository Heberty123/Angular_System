import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
  transition('New => List', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [style({ right: '-100%' })], { optional: true }),
    query(':leave', [style({ right: '0%' })], { optional: true }),
    group([
      query(':leave', [animate('300ms ease-out', style({ right: '100%' }))], { optional: true }),
      query(':enter', [animate('300ms ease-out', style({ right: '0%' }))], { optional: true })
    ])
  ]),
  transition('List => New', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [style({ left: '-100%' })], { optional: true }),
    query(':leave', [style({ left: '0%' })], { optional: true }),
    group([
      query(':leave', [animate('300ms ease-out', style({ left: '100%' }))], { optional: true }),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], { optional: true })
    ])
  ])
]);