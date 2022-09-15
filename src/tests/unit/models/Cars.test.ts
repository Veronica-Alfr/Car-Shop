import * as sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const { expect } = chai;
import Cars from '../../../models/Cars';
import { Model } from 'mongoose';
import { carMock, carMockWithId, carMockUpdate, carMockUpdateWithId } from '../../mocks/carsMock'; // criar
import { ErrorTypes } from '../../../errors/catalog';

chai.use(chaiAsPromised);

describe('Cars Model', () => {
    const carModel = new Cars();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate')
    .onCall(0).resolves(carMockUpdateWithId)
    .onCall(1).resolves(null);
    sinon.stub(Model, 'findByIdAndDelete').resolves()
    .onCall(0).resolves(carMockWithId)
    .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a frame', () => {
    it('successfully created', async () => {
        const newCar = await carModel.create(carMock);
        expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('searching all cars', () => {
    it('successfully found', async () => {
        const carsFound = await carModel.read();
        expect(carsFound).to.be.deep.equal([carMockWithId]);
     });
   });

  describe('searching a car', () => {
    it('successfully found', async () => {
        const carFound = await carModel.readOne('6323378c1efc1d4f7d4acad4');
        expect(carFound).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
        expect(carModel.readOne('123IdErrado')).to.eventually.be
        .rejectedWith(ErrorTypes.InvalidMongoId);
    });
   });

   describe('changing a car', () => {
    it('successfully changed', async () => {
        const carChanged = await carModel.
        update('6323378c1efc1d4f7d4acad4', carMockUpdate);

        expect(carChanged).to.be.deep.equal(carMockUpdateWithId);
    });

    it('no successfully changed', async () => {
        const carChanged = await carModel.
        update('6323378c1efc1d4f7d4acac3', carMockUpdate);

        expect(carChanged).to.be.null;
    });

    it('_id not found to change', async () => {
        expect(carModel.update('123IdErrado', carMockUpdate)).to.eventually.be
        .rejectedWith(ErrorTypes.InvalidMongoId);
    });
   });

   describe('deleting a car', () => {
    it('successfully deleted', async () => {
        const deletedCar = await carModel.delete('6323378c1efc1d4f7d4acad4');
        expect(deletedCar).to.be.deep.equal(carMockWithId);
    });

    it('_id not found to delete', async () => {
        expect(carModel.delete('123IdErrado')).to.eventually.be
        .rejectedWith(ErrorTypes.InvalidMongoId);
    });
   });
});