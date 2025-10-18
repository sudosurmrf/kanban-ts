//this works since it will only through an error if there is any type here. since
//it expects a type of "never" which only occurs when all cases are covered. 
export const assertNever = (x: never): never => { 
  throw new Error(`Unhandled: ${JSON.stringify(x)}`);
};