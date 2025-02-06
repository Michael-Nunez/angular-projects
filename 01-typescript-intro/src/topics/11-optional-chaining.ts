export interface Passenger {
    name: string,
    children?: string[]
}

const passenger1: Passenger = {
    name: 'Michael',
}

const passenger2: Passenger = {
    name: 'Jose',
    children: ['Juan', 'Pedro']
}

const returnChildrenNumber = (passenger: Passenger): number => {
    const howManyChildrens = passenger.children?.length || 0;
    // const howManyChildrens = passenger.children!.length;

    console.log(passenger.name, howManyChildrens);

    return howManyChildrens;
}

returnChildrenNumber(passenger1);