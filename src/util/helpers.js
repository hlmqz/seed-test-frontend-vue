
export function parseJSON(text) {
	try {
		return JSON.parse(text);
	}
	catch (e) {
		return null;
	}
}

export function compareRecursive(o1, o2){
	if(typeof o1 != typeof o2) return false;

	if(typeof o1 == 'object'){
		let rt = true;
		// compare Arrays
		if(Array.isArray(o1) || Array.isArray(o2)){

			if(Array.isArray(o1) && Array.isArray(o2)){
				o1.forEach((v,i) => {
					if(!(rt &&= compareRecursive(v, o2[i]))) return false;
				});
				o2.forEach((v,i) => {
					if(!(rt &&= compareRecursive(v, o1[i]))) return false;
				});
				return rt;
			}
			else return false;
		}
		else{
			if(!o1 && !o2) return true;

			if(!o1 || !o2) return false;
			else {
				for(let i in o1){
					if(!(rt &&= compareRecursive(o1[i], o2[i]))) return false;
				}
				for(let i in o2){
					if(!(rt &&= compareRecursive(o1[i], o2[i]))) return false;
				}
				return rt;
				
			}
		}
	}
	else {
		return o1 == o2;
	}
}


export function organizeErrors(data, prefix=''){
	let errs = [];

	if(Array.isArray(data)){
		errs.push({key: prefix, type: 'array', val:''});
		data.forEach(value => errs = errs.concat(organizeErrors(value)));
	}
	else if(typeof data == 'object' && data)
		for(let property in data){
			 errs = errs.concat(organizeErrors(data[property], property));
	}

	let val = undefined;


	if(['string', 'number', 'boolean'].includes(typeof data)){

		errs.push({
			key: prefix,
			val: (typeof data == 'boolean' ? (data ? 'TRUE' : 'FALSE') : `${data}`),
			type: Array.isArray(data) ? 'array' : typeof data,
		});
	}

	return errs;
}