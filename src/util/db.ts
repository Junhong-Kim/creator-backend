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

export function findAll(Model: any, offset: number, limit: number) {
  return Model.findAll({
    offset: offset,
    limit:  limit,
    order: [
      ["id", "DESC"]
    ],
  }).then((data: object[]) => {
    return data;
  }).catch((err: string) => {
    throw new Error(err);
  });
}
