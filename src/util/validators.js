
export default {

	isValue(v){
		return (
					typeof v == 'undefined'
					|| (Array.isArray(v) && !v.length)
					|| (typeof v == 'object' && !v)
					|| (typeof v == 'string' && !v.trim())
				)
				? 'No es un valor válido'
				: true ;
	},

	isEmail(v){
		return /^\w+[\w\._-]+@\w+(\.\w{2,})+$/.test(`${v}`)
				? true
				: `No es un formato de e-mail`;
	},

	valueMin(v, min=1){
		v = parseInt(v);
		return v >= min
				? true
				: `El valor mínimo permitido es ${min}`;
	},

	lengthMax(v, max=Number.MAX_SAFE_INTEGER){
		if(!v) v = '';
		return v.trim().length <= max
				? true
				: `el máximo de texto permitido es de ${max} caracteres` ;
	},

}