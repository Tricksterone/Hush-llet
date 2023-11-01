interface Chore {
  id: number;
  home_id: number;
  name: string;
  description: string;
  task_rating: number;
  interval: number;
  imageUri?: string | null;
}

const mockChores: Chore[] = [
  {
    id: 1,
    home_id: 1,
    name: 'Wash Dishes',
    description: 'Wash all the dirty dishes in the kitchen',
    task_rating: 2,
    interval: 2,
    imageUri: '',
  },
  {
    id: 2,
    home_id: 1,
    name: 'Mow the Lawn',
    description: 'Mow the front and backyard lawns',
    task_rating: 4,
    interval: 7,
    imageUri: '',
  },
  {
    id: 3,
    home_id: 1,
    name: 'Laundry',
    description: 'Do a load of laundry',
    task_rating: 2,
    interval: 4,
    imageUri: '',
  },
  {
    id: 4,
    home_id: 1,
    name: 'Cook Dinner',
    description: 'Cook todays dinner',
    task_rating: 1,
    interval: 1,
    imageUri: '',
  },
  {
    id: 5,
    home_id: 1,
    name: 'Dusting',
    description: 'Dust the furnitures',
    task_rating: 8,
    interval: 5,
    imageUri: '',
  },
  {
    id: 6,
    home_id: 1,
    name: 'Mopping',
    description: 'Mop the floor',
    task_rating: 6,
    interval: 6,
    imageUri: '',
  },
];

export { Chore, mockChores };
