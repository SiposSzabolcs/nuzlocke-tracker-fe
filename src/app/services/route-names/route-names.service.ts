import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteNamesService {
  routesList: any[] = [];

  routes = {
    kanto_routes: [
      285, 295, 280, 313, 296, 321, 297, 298, 290, 281, 314, 315, 299, 300, 282,
      305, 317, 303, 304, 292, 336, 276, 302, 301, 283, 762, 309, 310, 311, 284,
      345, 308, 307, 306, 330, 277, 278, 258, 279, 341, 561, 312, 329, 294,
    ],
    johto_routes: [
      184, 185, 186, 187, 188, 253, 189, 190, 192, 193, 198, 201, 798, 202, 204,
      205, 765, 206, 207, 209, 210, 211, 212, 222, 223, 224, 225, 226, 227, 235,
      236, 237, 241, 242, 841, 243, 244, 249, 250, 251, 252, 288, 316, 287, 294,
    ],
    hoenn_routes: [
      393, 395, 394, 350, 396, 365, 834, 408, 360, 397, 433, 398, 361, 399, 399,
      401, 351, 402, 441, 387, 409, 404, 405, 406, 439, 356, 407, 366, 787, 367,
      403, 438, 410, 411, 412, 413, 429, 414, 368, 415, 352, 416, 353, 418, 385,
      421, 422, 376, 419, 354, 377, 400, 389, 423, 424, 425, 434, 426, 427, 428,
      355, 382,
    ],
  };

  regions = {
    kanto: ['firered', 'leafgreen'],
    johto: ['soulsilver', 'heartgold'],
    hoenn: ['ruby', 'sapphire'],
  };

  getRoutes(version: string) {
    for (const region in this.regions) {
      if (this.regions[region as keyof typeof this.regions].includes(version)) {
        switch (region) {
          case 'kanto':
            return this.routes.kanto_routes;
          case 'johto':
            return this.routes.johto_routes;
          case 'hoenn':
            return this.routes.hoenn_routes;
          default:
            console.log("region doesn't exist");
        }
      }
    }
    return undefined;
  }

  public routeNames = {
    '285': 'Pallet Town',
    '295': 'Route 1',
    '280': 'Viridian City',
    '313': 'Route 22',
    '296': 'Route 2',
    '321': 'Viridian Forest',
    '297': 'Route 3',
    '298': 'Route 4',
    '290': 'Mt. Moon',
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
    '184': 'New Bark Town',
    '185': 'Route 29',
    '186': 'Cherrygrove City',
    '187': 'Route 30',
    '188': 'Route 31',
    '253': 'Dark Cave',
    '189': 'Violet City',
    '190': 'Sprout Tower',
    '192': 'Route 32',
    '193': 'Ruins of Alph',
    '198': 'Union Cave',
    '201': 'Route 33',
    '798': 'Azalea Town',
    '202': 'Slowpoke Well',
    '204': 'Ilex Forest',
    '205': 'Route 34',
    '765': 'Goldenrod City North Gate',
    '206': 'Route 35',
    '207': 'National Park',
    '209': 'Route 36',
    '210': 'Route 37',
    '211': 'Ecruteak City',
    '212': 'Burned Tower 1F',
    '222': 'Route 38',
    '223': 'Route 39',
    '224': 'Olivine City',
    '225': 'Route 40',
    '226': 'Route 41',
    '227': 'Whirl Islands',
    '235': 'Cianwood City',
    '236': 'Route 42',
    '237': 'Mt. Mortar',
    '241': 'Route 43',
    '242': 'Lake of Rage',
    '841': 'Team Rocket HQ',
    '243': 'Route 44',
    '244': 'Ice Path',
    '249': 'Blackthorn City',
    '250': "Dragon's Den",
    '251': 'Route 45',
    '252': 'Route 46',
    '288': 'Kanto Route 27',
    '316': 'Tohjo Falls',
    '287': 'Route 26',
    '393': 'Route 101',
    '395': 'Route 103',
    '394': 'Route 102',
    '350': 'Petalburg City',
    '396': 'Route 104',
    '365': 'Petalburg Woods',
    '834': 'Rustboro City',
    '408': 'Route 116',
    '360': 'Rusturf Tunnel',
    '397': 'Route 105',
    '433': 'Dewford Town',
    '398': 'Route 106',
    '361': 'Granite Cave 1F',
    '399': 'Route 107',
    '401': 'Route 109',
    '351': 'Slateport City',
    '402': 'Route 110',
    '441': 'Altering Cave',
    '387': 'New Mauville',
    '409': 'Route 117',
    '404': 'Route 112',
    '405': 'Route 113',
    '406': 'Route 114',
    '439': 'Desert Underpass',
    '356': 'Meteor Falls',
    '407': 'Route 115',
    '366': 'Jagged Pass',
    '787': 'Lavaridge Town',
    '367': 'Fiery Path',
    '403': 'Route 111',
    '438': 'Mirage Tower',
    '410': 'Route 118',
    '411': 'Route 119',
    '412': 'Route 120',
    '413': 'Route 121',
    '429': 'Safari Zone',
    '414': 'Route 122',
    '368': 'Mt. Pyre 1F',
    '415': 'Route 123',
    '352': 'Lilycove City',
    '416': 'Route 124',
    '353': 'Mossdeep City',
    '418': 'Route 125',
    '385': 'Shoal Cave',
    '421': 'Route 127',
    '422': 'Route 128',
    '376': 'Seafloor Cavern',
    '419': 'Route 126',
    '354': 'Sootopolis City',
    '377': 'Cave of Origin',
    '400': 'Route 108',
    '389': 'Abandoned Ship',
    '423': 'Route 129',
    '424': 'Route 130',
    '425': 'Route 131',
    '434': 'Pacifidlog Town',
    '426': 'Route 132',
    '427': 'Route 133',
    '428': 'Route 134',
    '355': 'Ever Grande City',
    '382': 'Victory Road',
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
