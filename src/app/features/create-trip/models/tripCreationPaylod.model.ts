export interface TripCreationDto {
  title: string,
  city_id: number,
  destinations: string[],
  description: string,
  price_range: number,
  duration: number,
}
