export function create(Model: any, data: object) {
  return Model.create(data);
}

export function findOrCreate(Model: any, condition: object, data: object) {
  return Model.findOrCreate({
    where: condition,
    defaults: data,
  }).spread((instance: any, created: boolean) => {
    return instance;
  });
}

export function findOne(Model: any, condition: object) {
  return Model.findOne({
    where: condition,
  });
}

export function findOneWithJoin(Model: any, joinModel: any, condition: object) {
  return Model.findOne({
    where: condition,
    include: [
      joinModel,
    ],
  });
}

export function findAll(Model: any, offset: number, limit: number) {
  return Model.findAll({
    offset: offset,
    limit: limit,
    order: [
      ["id", "DESC"],
    ],
  }).then((data: object[]) => {
    return data;
  }).catch((err: string) => {
    throw new Error(err);
  });
}

export function findAllWithJoin(Model: any, joinModel: any, offset: number, limit: number) {
  return Model.findAll({
    offset: offset,
    limit: limit,
    order: [
      ["id", "DESC"],
    ],
    include: [
      joinModel,
    ],
  }).then((data: object[]) => {
    return data;
  }).catch((err: string) => {
    throw new Error(err);
  });
}

export function totalCount(Model: any) {
  return Model.count()
    .then((count: number) => {
      return count;
    });
}
