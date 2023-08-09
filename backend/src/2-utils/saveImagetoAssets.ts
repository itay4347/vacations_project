import Vacation from "../4-models/Vacation";
import {v4 as uuid} from 'uuid';


//this takes the image that the user uploaded when editing or adding a vacation.
//change its name with the uuid library and save it in the assets/images folder.
export const saveImagesToAssets = async (vacation:Vacation) => {
    if(vacation.image) {
        const extension = vacation.image.name.split('.').pop();
        vacation.imageName = `${uuid()}.${extension}`;
        await vacation.image.mv(`./src/1-assets/images/${vacation.imageName}`);
    }
}