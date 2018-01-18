
import Angestellter from './Angestellter';  

class Models {
    constructor(){ 
        if(! Models.instance){
            this.instances = {}; 
            Models.instance = this;
        } 
        return Models.instance; 
    }

    set(database){ 
        // add here new models
        this.instances.angestellter = new Angestellter(database); 
    }

    get(instance){
        if(this.instances[instance]) {
            return this.instances[instance];
        } 
        throw Error('Given model does not exist!');
    }
}

const models = new Models();
Object.freeze(models);
export default models;