import PasswordModel from '../schemas/password.schema';
import bcrypt from 'bcrypt';


class PasswordService {
    public async createOrUpdate(data: any) {
        const result = await PasswordModel.findOneAndUpdate({userId: data.userId}, {$set: {password: data.password}}, {new: true});
        if (!result) {
            const dataModel = new PasswordModel({userId: data.userId, password: data.password});
            return await dataModel.save();
        }
        return result;
    }


    async authorize(userId: string, plainPassword: string): Promise<boolean> {
        const record = await PasswordModel.findOne({userId});
        if (!record) return false;
        return bcrypt.compare(plainPassword, record.password);
    }


    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
}


export default PasswordService;