export default function(per_page = 15){
	return {
		data:[],
		current_page: 1,
		last_page: 1,
		per_page,
		total: 0,
	}
}
