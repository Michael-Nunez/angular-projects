export class Person {
    constructor(
        public firstname: string,
        public lastname: string,
        private address: string = 'No Address'
    ) { }
}

// export class Hero extends Person {
//     constructor(
//         public alterEgo: string,
//         public age: number,
//         public realName: string
//     ) {
//         super(realName, 'New York');
//     }
// }

export class Hero {
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person
    ) { }
}

const tony = new Person('Tony', 'Stark', 'New York');
const ironMan = new Hero('Iron Man', 45, 'Tony', tony);

console.log(ironMan);