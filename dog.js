require('reflect-metadata')

import Animal from './animal'

@Reflect.metadata('dogattr', {canRun: true})
export default class Dog extends Animal {
  constructor() {
    super()
  }
  @Reflect.metadata('dogparameters', [
    {"name":"string","isArray":false,"isPrimitive":true}
  ])
  static isFourFeet(){
    console.log('I am a dog')
  }
}