require('reflect-metadata')

@Reflect.metadata('attr', {canRun: false})
export default class Animal {
  @Reflect.metadata('parameters', [
    {"name":"string","isArray":true,"isPrimitive":true}
  ])
  static isFourFeet(animalName){
    if (animalName === 'cat') {
      return true
    }
    if (animalName === 'fish') {
      return false
    }
  }
}