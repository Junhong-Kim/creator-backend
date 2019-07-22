export function findOrCreate(Model: any, condition: any, data: any) {
  return Model.findOrCreate({
    where: condition,
    defaults: data,
  }).spread((instance: any, created: any) => {
    return instance;
  });
}
