import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const sopranos = [
    {id:1,edad:23,nombre:'Manzanares'},
    {id:2,edad:26,nombre:'Juani'},
    {id:3,edad:22,nombre:'Xabieh'},
    {id:4,edad:20,nombre:'Cuarto'}
    ];
    return {sopranos};
  }
}
