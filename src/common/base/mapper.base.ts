export interface Mapper<Entity, Dto> {
  fromDto(id: string, dto: Dto): Entity;
}
