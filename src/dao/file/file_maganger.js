import fs from "fs";

class FileManager{
	constructor(path){
		this.path = path;
	}

	read = () => {
		if (fs.existsSync(this.path)) {
            return fs.promises.readFile(this.path, 'utf-8').then(r => JSON.parse(r));
        } 
        return [];
	};

	write = (list) => {
		return fs.promises.writeFile(this.path, JSON.stringify(list));
	};

	add = async (obj) => {
        const list = await this.read();
        const nextID = this.getNextId(list);
        obj._id = nextID;
        list.push(obj);
        await this.write(list);
        return obj;
    }

    update = async (id, obj) => {
        obj._id = parseInt(id);
        const list = await this.read()
        for (let i = 0; i < list.length; i++) {
            if (list[i]._id == id) {
                list[i] = obj
                break
            }
        }
        await this.write(list)
    }

	getNextId = (list) => {
		const count = list.length
        return (count > 0) ? list[count-1]._id +1 : 1; 
	};

    getById = async (id) => {
		return await this.getOneByParam("_id", id);
	};

	getOneByParam = async (param, value) => {
		const data = await this.read();
		const obj = data.find(d => d[param] == value);
		return obj;
	};

    delete = async(id) => {
        const list = await this.read();
        console.log(typeof id)
        const result = list.filter(element => element._id !== parseInt(id));
        await this.write(result);
        return list.length < result.length;
    }

    getByParams = async(params) => {
        let results = await this.read();
		let i = 0;
        const arrayParams = params.map(element => Object.entries(element)[0]);
		while(i < arrayParams.length && results.length > 0){
            results = results.filter(element => element[arrayParams[i][0]] === arrayParams[i][1]);
            i++;
		};
		return results;
	};

}

export default FileManager;