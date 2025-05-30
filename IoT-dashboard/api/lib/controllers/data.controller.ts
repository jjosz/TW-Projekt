import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import {checkIdParam} from "../middlewares/deviceIdParam.middleware";
import DataService from "../modules/services/data.service";
import {config} from "../config";

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    public dataService = new DataService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.get(`${this.path}/:id`, checkIdParam, this.getAllDeviceData);
        this.router.get(`${this.path}/:id/latest`, checkIdParam,this.getLatestForId);
        this.router.get(`${this.path}/:id/:num`, checkIdParam,this.getFromIdInRange);
        this.router.post(`${this.path}/:id`,checkIdParam, this.addData);
        this.router.delete(`${this.path}/all`, this.deleteAll);
        this.router.delete(`${this.path}/:id`,checkIdParam, this.deleteOne);
    }

    private getAllDeviceData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query(id);
        response.status(200).json(allData);
    };

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { air } = request.body;
        const { id } = request.params;

        const data = {
            temperature: air[0].value,
            pressure: air[1].value,
            humidity: air[2].value,
            deviceId: Number(id),
            readingDate : new Date()
        }

        try {

            await this.dataService.createData(data);
            response.status(200).json(data);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Invalid input data.' });
        }
    };
    private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        const allData = await this.dataService.getAllNewest();
        response.status(200).json(allData);
    };


   // private addData= async (request: Request, response: Response, next: NextFunction) => {
   //     const { elem } = request.body;
   //     const { id } = request.params;
    //    console.log(elem);
    //    if(!isNaN(Number(elem))) {
    //        testArr.push(elem);
   //     }
//
    //    response.status(200).json(testArr);
   // };


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
        const data = await this.dataService.get(id);

        response.status(200).json(data);
    };
    private getFromIdInRange = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;

        response.status(200).json(testArr.length);
    };
    private deleteAll = async (request: Request, response: Response, next: NextFunction) => {
        for(let i = 0; i<config.supportedDevicesNum;i++)
        {
            await this.dataService.deleteData(String(i));
        }
        response.status(200).json(await this.dataService.getAllNewest());
    };
    private deleteOne = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.deleteData(id);
        response.status(200).json(allData);
    };
}

export default DataController;