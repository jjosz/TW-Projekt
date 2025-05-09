import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.get(`${this.path}/:id`, this.getElement);
        this.router.get(`${this.path}/:id/latest`, this.getLatestForId);
        this.router.get(`${this.path}/:id/:num`, this.getFromIdInRange);
        this.router.post(`${this.path}/:id`, this.addData);
        this.router.delete(`${this.path}/all`, this.deleteAll);
        this.router.delete(`${this.path}/:id`, this.deleteOne);
    }

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(testArr);
    };
    private addData= async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;
        const { id } = request.params;
        console.log(elem);
        if(!isNaN(Number(elem))) {
            testArr.push(elem);
        }

        response.status(200).json(testArr);
    };
    private getElement = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        console.log(Number(id));
        if(!isNaN(Number(id))&&Number(id)>-1 && Number(id)<testArr.length){
                response.status(200).json(testArr[parseInt(id)])
        }
        else{
            response.status(200).json("Błędne id");
        }

    };
    private getLatestForId = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;

        response.status(200).json(Math.max(...testArr));
    };
    private getFromIdInRange = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;

        response.status(200).json(testArr.length);
    };
    private deleteAll = async (request: Request, response: Response, next: NextFunction) => {
        testArr = [];
        response.status(200).json(testArr);
    };
    private deleteOne = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        if(!isNaN(parseInt(id))) {
            testArr.splice(parseInt(id), 1);
        }
        response.status(200).json(testArr);
    };
}

export default DataController;