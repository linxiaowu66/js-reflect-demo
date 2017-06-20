import Animal from './reflect'

function test() {
  const attr = Reflect.getMetadata('attr', Animal)
  console.log('animal attr is:', attr)
  const parameter = Reflect.getMetadata('parameters', Animal, "isFourFeet")
  console.log('isFourFeet parameter is:', parameter)
}

test()