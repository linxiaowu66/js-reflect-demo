require('reflect-metadata')

@Reflect.metadata('attr', {canRun: true})
export default class Animal {
  @Reflect.metadata('parameters', [
    {"name":"string","isArray":false}
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