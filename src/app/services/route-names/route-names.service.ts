import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteNamesService {
  routesList: any[] = [];
  kanto_routes = [
    285, 295, 280, 313, 296, 321, 297, 298, 256, 281, 314, 315, 299, 300, 282,
    305, 317, 303, 304, 292, 336, 276, 302, 301, 283, 762, 309, 310, 311, 284,
    345, 308, 307, 306, 330, 277, 278, 258, 279, 341, 561, 312, 329, 294,
  ];
  public routeNames = {
    '285': 'Pallet Town',
    '295': 'Route 1',
    '280': 'Viridian City',
    '313': 'Route 22',
    '296': 'Route 2',
    '321': 'Viridian Forest',
    '297': 'Route 3',
    '298': 'Route 4',
    '256': 'Mt. Moon',
    '281': 'Cerulean City',
    '314': 'Route 24',
    '315': 'Route 25',
    '299': 'Route 5',
    '300': 'Route 6',
    '282': 'Vermilion City',
    '305': 'Route 11',
    '317': "Diglett's Cave",
    '303': 'Route 9',
    '304': 'Route 10',
    '292': 'Rock Tunnel',
    '336': 'Pokémon Tower',
    '276': 'Route 12',
    '302': 'Route 8',
    '301': 'Route 7',
    '283': 'Celadon City',
    '762': 'Saffron City',
    '309': 'Route 16',
    '310': 'Route 17',
    '311': 'Route 18',
    '284': 'Fuchsia City',
    '345': 'Safari Zone',
    '308': 'Route 15',
    '307': 'Route 14',
    '306': 'Route 13',
    '330': 'Power Plant',
    '277': 'Sea Route 19',
    '278': 'Sea Route 20',
    '258': 'Seafoam Islands',
    '279': 'Cinnabar Island',
    '341': 'Pokémon Mansion',
    '561': 'One Island',
    '312': 'Sea Route 21',
    '329': 'Route 23',
    '294': 'Victory Road',
  };

  public getRouteName(routeId: number): string {
    const routeIdStr = routeId.toString();
    return (
      this.routeNames[routeIdStr as keyof typeof this.routeNames] ||
      'Unknown Route'
    );
  }

  public removeRoute(routeId: number) {
    this.routesList = this.routesList.filter((item) => item !== routeId);
  }
  constructor() {}
}
