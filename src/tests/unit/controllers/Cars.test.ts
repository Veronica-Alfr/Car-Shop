import { Request, Response } from 'express';
import Sinon, * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import Cars from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import CarsController from '../../../controllers/Cars';
import { carMock, carMockWithId, carMockUpdateWithId, carMockUpdate } from '../../mocks/carsMock';

describe('Cars Controller', () => {
    const carModel = new Cars()
    const carService = new CarsService(carModel);
    const carController = new CarsController(carService);

    const req = {} as Request;
    const res = {} as Response;
  
    before(() => {
      sinon.stub(carService, 'create').resolves(carMockWithId);
      sinon.stub(carModel, 'read').resolves([carMockWithId]);
      sinon.stub(carService, 'readOne').resolves(carMock);
      sinon.stub(carService, 'update').resolves(carMockUpdateWithId);
      sinon.stub(carService, 'delete').resolves();
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    after(() => {
      sinon.restore()
    })
  
    describe('Create Car', () => {
      it('Success', async () => {
        req.body = carMockWithId;

        await carController.create(req, res);
  
        expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
      });
    });

    describe('Read Cars', () => {
        it('Success', async () => {
          req.body = carMock;

          await carController.read(req, res);
    
          expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
          expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
        });
      });
  
    describe('ReadOne Car', () => {
      it('Success', async () => {
        req.params = { id: carMockWithId._id };

        await carController.readOne(req, res);
  
        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
      });
    });
  
    describe('Update Car', () => {
      it('Success', async () => {
        req.params = { id: carMockUpdateWithId._id };
        req.body = carMockUpdate;

        await carController.update(req, res);
  
        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(carMockUpdateWithId)).to.be.true;
      });
    });

    describe('Delete Car', () => {
        it('Success', async () => {
          req.params = { id: carMockWithId._id };

          await carController.delete(req, res);

        //   expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    
          expect((res.sendStatus as Sinon.SinonStub).calledWith(204)).to.be.true;
        });
      });
});
