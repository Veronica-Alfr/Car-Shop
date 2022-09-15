import * as sinon from 'sinon';
import * as chai from 'chai';
const { expect } = chai;
import Cars from '../../../models/Cars';
import { Model } from 'mongoose';
import { carMock, carMockWithId, carMockUpdate, carMockUpdateWithId } from '../../mocks/carsMock'; // criar
import { ErrorTypes } from '../../../errors/catalog';

describe('Cars Model', () => {
    const carModel = new Cars();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdateWithId);
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
        try {
            await carModel.readOne('123IdErrado');
        } catch (error: any) {
            expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
        }
    });
   });

   describe('changing a car', () => {
    it('successfully changed', async () => {
        const carChanged = await carModel.
        update('6323378c1efc1d4f7d4acad4', carMockUpdate);

        expect(carChanged).to.be.deep.equal(carMockUpdateWithId);
    });

    it('_id not found to change', async () => {
        try {
            await carModel.update('123IdErrado', carMockUpdate);
        } catch (error:any) {
            expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
        }
    });
   });

   describe('deleting a car', () => {
    it('successfully deleted', async () => {
        const deletedCar = await carModel.delete('6323378c1efc1d4f7d4acad4');
        expect(deletedCar).to.be.true;
    });

    it('_id not found to delete', async () => {
        try {
            await carModel.delete('123IdErrado');
        } catch (error:any) {
            expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
        }
    });
   });
});