import { ICar } from "../../interfaces/ICar";

const carMock: ICar = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2
}

const carMockWithId: ICar & { _id:string } = {
    _id: "6323378c1efc1d4f7d4acad4",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2
}

const carMockUpdate: ICar = {
    model: "Ferrari Maranello",
    year: 1970,
    color: "red",
    buyValue: 3400000,
    doorsQty: 2,
    seatsQty: 2
}

const carMockUpdateWithId: ICar & { _id:string } = {
    _id: "6323378c1efc1d4f7d4acad4",
    model: "Ferrari Maranello",
    year: 1970,
    color: "red",
    buyValue: 3400000,
    doorsQty: 2,
    seatsQty: 2
}

export { carMock, carMockWithId, carMockUpdate, carMockUpdateWithId };
