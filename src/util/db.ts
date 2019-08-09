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
