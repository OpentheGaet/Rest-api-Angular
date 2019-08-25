export const testDecortator = function test() {
  return (target : any, methodName : string, descriptor : any) => {
    let hello = 'hello world !';
    console.log('function ' + methodName + ' called at ' + Date.now());
    console.log('the decorator works and say ' + hello);
    return descriptor;
  }
}
