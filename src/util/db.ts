export function create(Model: any, data: Object) {
  return Model.create(data);
}

export function findOrCreate(Model: any, condition: Object, data: Object) {
  return Model.findOrCreate({
    where: condition,
    defaults: data,
  }).spread((instance: any, created: boolean) => {
    return instance;
  });
}

export function findOne(Model: any, condition: Object) {
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
