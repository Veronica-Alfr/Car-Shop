// import chaiAsPromised from 'chai-as-promised';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import Cars from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import { carMock, carMockWithId } from '../../mocks/carsMock';

// chai.use(chaiAsPromised);

describe('Cars Service', () => {
    const carModel = new Cars();
    const carService = new CarsService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne').resolves(carMockWithId)
    .onCall(0).resolves(carMockWithId)
    .onCall(1).resolves(null);
    sinon.stub(carModel, 'update')
    .onCall(0).resolves(carMockWithId)
    .onCall(1).resolves(null);
    sinon.stub(carModel, 'delete')
    .onCall(0).resolves(carMockWithId)
    .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create Car', () => {
    it('Success', async () => {
        const frameCreated = await carService.create(carMock);

        expect(frameCreated).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
        let err: any;

        try {
            await carService.create({});
        } catch (error) {
            err = error;
        }

        expect(err).to.be.instanceOf(ZodError);
    });
   });

   describe('Read Cars', () => {
    it('Success', async () => {
        const cars = await carService.read();

        expect(cars).to.be.deep.equal([carMockWithId]);
    })
   });

   describe('ReadOne Car', () => {
    it('Success', async () => {
        const car = await carService.readOne("6323378c1efc1d4f7d4acad4");

        expect(car).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
        let err: any;

        try {
            await carService.readOne("6323378c1efc1d4f7d4acad4");
        } catch (error) {
            err = error;
        }

        expect(err, 'error should be defined').not.to.be.undefined;
        expect(err.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
    });
   });

   describe('Update Car', () => {
    it('Success', async () => {
        const updated = await carService.update("6323378c1efc1d4f7d4acad4", carMock);

        expect(updated).to.be.deep.eq(carMockWithId);
    });

    it('Failure - Not Found', async () => {
        let err: any;

        try {
            await carService.update("6323378c1efc1d4f7d4acac3", carMock);
        } catch(error) {
            err = error;
        }

        expect(err, 'error should be defined').not.to.be.undefined;
        expect(err.message).to.be.eq(ErrorTypes.ObjectNotFound);
    });

    it('Failure - Zod Fails', async () => {
        let err: any;

        try {
            await carService.update("6323378c1efc1d4f7d4acad4", {});
        } catch(error) {
            err = error;
        }

        expect(err, 'error should be defined').not.to.be.undefined;
        expect(err).to.be.instanceOf(ZodError);
      });
    });

    describe('Delete Car', () => {
        it('Success', async () => {
            const updated = await carService.delete("6323378c1efc1d4f7d4acad4");
    
            expect(updated).to.be.deep.eq(carMockWithId);
        })
    
        it('Failure - Not Found', async () => {
            let err: any;
    
            try {
                await carService.delete("6323378c1efc1d4f7d4acac3");
            } catch(error) {
                err = error;
            }
    
            expect(err, 'error should be defined').not.to.be.undefined;
            expect(err.message).to.be.eq(ErrorTypes.ObjectNotFound);
        });
    });
});