class MemoryManager{
	constructor(){
		this.list = [];
	}

	add = async (obj) => {
        const nextID = this.getNextId();
        obj._id = nextID;
        this.list.push(obj);
        return obj;
    }

    update = async (id, obj) => {
        obj._id = parseInt(id);
		const index = this.list.findIndex(element => element._id === parseInt(id));
		if(index > -1){
			this.list[index] = obj;
		}
		console.log(index)
		return index;
    }

	getNextId = () => {
		const count = this.list.length
        return (count > 0) ? this.list[count-1]._id +1 : 1; 
	};

	getById = async (id) => {
		return await this.getOneByParam("_id", id);
	};

	getOneByParam = async (param, value) => {
		const data = this.list.slice(0);
		const obj = data.find(d => d[param] == value);
		return obj;
	};

    delete = async(id) => {
		const result = this.list.filter(element => element._id !== parseInt(id));
        if(this.list.length > result.length){
			this.list = result;
			return true;
		}
        return false;
    };

	getByParams = async(params) => {
        let results = this.list.slice(0);
		let i = 0;
        const arrayParams = params.map(element => Object.entries(element)[0]);
		while(i < arrayParams.length && results.length > 0){
            results = results.filter(element => element[arrayParams[i][0]] === arrayParams[i][1]);
            i++;
		};
		return results;
	};

}

export default MemoryManager;